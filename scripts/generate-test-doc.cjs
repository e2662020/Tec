const fs = require('fs');
const path = require('path');
const https = require('https');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const WORDS = [
  '计算机', '程序', '设计', '开发', '系统', '应用', '软件', '硬件', '网络', '数据',
  '算法', '结构', '模型', '框架', '平台', '服务', '接口', '协议', '安全', '性能',
  '优化', '测试', '部署', '维护', '升级', '配置', '管理', '监控', '日志', '备份',
  '恢复', '同步', '异步', '并发', '并行', '分布式', '集群', '容器', '虚拟化', '云计算',
  '大数据', '人工智能', '机器学习', '深度学习', '神经网络', '自然语言', '图像识别', '语音识别', '推荐系统', '搜索引擎',
  '数据库', '缓存', '消息队列', '事件驱动', '微服务', '服务网格', '网关', '负载均衡', '熔断', '限流',
  '降级', '隔离', '超时', '重试', '幂等', '事务', '一致性', '可用性', '分区容忍', 'CAP',
  'BASE', 'ACID', 'SQL', 'NoSQL', '文档', '键值', '列族', '图数据库', '时序', '关系型',
  '索引', '查询', '聚合', '排序', '过滤', '分页', '缓存穿透', '缓存击穿', '缓存雪崩', '热点',
  '冷数据', '温数据', '归档', '压缩', '加密', '解密', '签名', '验签', '证书', '令牌',
  '认证', '授权', '鉴权', '审计', '合规', '隐私', '脱敏', '掩码', '哈希', '摘要',
  '对称加密', '非对称加密', '公钥', '私钥', '数字信封', 'SSL', 'TLS', 'HTTPS', 'SSH', 'VPN',
  '防火墙', '入侵检测', '漏洞扫描', '渗透测试', '安全审计', '风险评估', '应急响应', '灾备', '高可用', '容灾',
  '监控告警', '链路追踪', '性能分析', '瓶颈', '调优', '扩容', '缩容', '弹性', '自动化', 'DevOps',
  'CI/CD', '持续集成', '持续交付', '持续部署', '蓝绿部署', '金丝雀', '灰度', 'A/B测试', '功能开关', '特性管理',
  '版本控制', 'Git', '分支', '合并', '冲突', '回滚', '标签', '发布', '迭代', '敏捷',
  'Scrum', 'Kanban', '看板', '冲刺', ' backlog', '用户故事', '需求', '原型', '设计稿', 'UI',
  'UX', '交互', '视觉', '动效', '响应式', '自适应', '移动端', '桌面端', 'Web', '小程序',
  'App', 'iOS', 'Android', 'Flutter', 'ReactNative', '跨平台', '混合应用', 'PWA', 'SPA', 'SSR',
  'CSR', '同构', '渲染', '虚拟DOM', 'diff', '补丁', '更新', '状态', '属性', '事件',
  '生命周期', '钩子', '组件', '模块', '包', '库', '工具', '插件', '扩展', '生态',
  '社区', '开源', '贡献', '协议', '许可', '版权', '专利', '商标', '品牌', '文档',
  '注释', '规范', '风格', '格式化', 'Lint', '类型检查', '单元测试', '集成测试', '端到端', '回归',
  '覆盖率', '变异测试', '契约测试', '混沌工程', '故障注入', '压力测试', '负载测试', '容量测试', '稳定性', '可靠性',
  '可维护性', '可扩展性', '可移植性', '兼容性', '互操作性', '标准化', '规范化', '最佳实践', '模式', '反模式',
  '重构', '技术债', '代码异味', '圈复杂度', '耦合度', '内聚性', 'SOLID', 'DRY', 'KISS', 'YAGNI',
  '面向对象', '函数式', '响应式', '声明式', '命令式', '泛型', '多态', '继承', '封装', '抽象',
  '接口隔离', '依赖注入', '控制反转', '工厂模式', '单例', '观察者', '发布订阅', '策略', '装饰器', '代理',
  '适配器', '桥接', '组合', '外观', '享元', '职责链', '命令', '解释器', '迭代器', '中介者',
  '备忘录', '原型', '访问者', '状态', '模板方法', '建造者', '抽象工厂', '原型链', '闭包', '作用域',
  '上下文', '执行栈', '事件循环', '回调', 'Promise', 'async', 'await', '生成器', '迭代器', 'Symbol',
  'Reflect', 'Proxy', 'Map', 'Set', 'WeakMap', 'WeakSet', 'ArrayBuffer', 'TypedArray', 'DataView', 'JSON',
  '正则表达式', '字符串', '数组', '对象', '函数', '类', '模块', '命名空间', '类型', '接口',
  '枚举', '联合', '交叉', '泛型约束', '条件类型', '映射类型', '工具类型', '推断', '断言', '守卫',
  '装饰器', '元数据', '反射', '序列化', '反序列化', '深拷贝', '浅拷贝', '冻结', '密封', '扩展',
  '原型污染', '原型链污染', 'XSS', 'CSRF', 'SQL注入', '命令注入', '路径遍历', '文件包含', '反序列化漏洞', 'SSRF',
  '点击劫持', '中间人', '重放攻击', '暴力破解', '字典攻击', '彩虹表', '盐值', ' pepper', '密钥派生', '双因素',
  '生物识别', '行为分析', '风控', '反欺诈', '验证码', '滑块', '点选', '旋转', '语义', '行为',
  '设备指纹', '环境检测', '模拟器', 'Root', '越狱', 'Hook', '注入', '调试', '反调试', '混淆',
  '加固', '壳', '脱壳', '逆向', '反编译', '反汇编', '静态分析', '动态分析', '符号执行', '污点分析',
  '模糊测试', '漏洞挖掘', '漏洞利用', 'Exploit', 'Shellcode', 'ROP', 'JOP', 'COP', '堆喷射', 'UseAfterFree',
  '缓冲区溢出', '整数溢出', '格式化字符串', '类型混淆', 'UAF', 'DoubleFree', '内存泄漏', '悬垂指针', '野指针', '越界',
  '竞争条件', '死锁', '活锁', '饥饿', '优先级反转', 'ABA问题', '内存屏障', '原子操作', '锁', '信号量',
  '互斥量', '读写锁', '自旋锁', '条件变量', '屏障', ' future', 'promise', 'channel', 'actor', 'CSP',
  'STM', '持久化', '不可变性', '纯函数', '副作用', '引用透明', '惰性求值', '严格求值', '尾递归', 'Continuation',
  'Monad', 'Functor', 'Applicative', 'Semigroup', 'Monoid', 'Foldable', 'Traversable', 'Lens', 'Prism', 'Iso',
  '递归', '分治', '贪心', '动态规划', '回溯', '分支限界', '启发式', '遗传算法', '模拟退火', '蚁群',
  '粒子群', '神经网络', '卷积', '池化', '全连接', ' dropout', '批归一化', '残差', '注意力', 'Transformer',
  'BERT', 'GPT', 'LSTM', 'GRU', 'RNN', 'CNN', 'GAN', 'VAE', '扩散模型', '强化学习',
  'Q学习', '策略梯度', 'ActorCritic', 'PPO', 'A3C', 'DQN', '蒙特卡洛', '时序差分', '贝尔曼', '马尔可夫',
  '隐马尔可夫', '条件随机场', '最大熵', '支持向量机', '决策树', '随机森林', '梯度提升', 'XGBoost', 'LightGBM', 'CatBoost',
  'K近邻', 'K均值', '层次聚类', 'DBSCAN', '主成分', '因子分析', '奇异值分解', '特征提取', '特征选择', '降维',
  '过拟合', '欠拟合', '正则化', 'L1', 'L2', '弹性网络', '早停', '交叉验证', '网格搜索', '贝叶斯优化',
  '超参数', '学习率', '批量大小', 'epoch', '步长', '动量', '自适应', 'Adam', 'RMSprop', 'Adagrad',
  '词向量', 'Word2Vec', 'GloVe', 'FastText', 'ELMo', 'BERT', 'RoBERTa', 'ALBERT', 'ELECTRA', 'DeBERTa',
  'T5', 'BART', 'PEGASUS', 'GPT2', 'GPT3', 'GPT4', 'LLaMA', 'Alpaca', 'Vicuna', 'ChatGLM',
  '文心一言', '通义千问', '讯飞星火', '智谱', '百川', '商量', '盘古', '混元', '天工', 'Kimi',
  '提示工程', '上下文学习', '指令微调', 'RLHF', 'DPO', 'PPO', 'SFT', '预训练', '微调', '量化',
  '蒸馏', '剪枝', '稀疏', 'MoE', '专家混合', '路由', '负载均衡', '流水线', '张量并行', '数据并行',
  '模型并行', '流水线并行', 'ZeRO', 'FSDP', 'DeepSpeed', 'Megatron', 'ColossalAI', 'vLLM', 'TensorRT', 'ONNX',
  'OpenVINO', 'CoreML', 'TFLite', 'PyTorch', 'TensorFlow', 'JAX', 'Paddle', 'MindSpore', 'OneFlow', 'MXNet',
  'Caffe', 'Caffe2', 'Torch', 'Theano', 'CNTK', 'Chainer', 'Keras', 'FastAI', 'HuggingFace', 'Transformers',
  'Dataset', 'Tokenizer', 'Trainer', 'Pipeline', 'Gradio', 'Streamlit', 'Flask', 'Django', 'FastAPI', 'Tornado',
  'Express', 'Koa', 'NestJS', 'Spring', 'SpringBoot', 'SpringCloud', 'MyBatis', 'Hibernate', 'JPA', 'JDBC',
  'ODBC', 'ADO', 'ORM', 'DAO', 'DTO', 'VO', 'POJO', 'Entity', 'Repository', 'Service',
  'Controller', 'Interceptor', 'Filter', 'Middleware', 'AOP', 'IOC', 'DI', 'Bean', 'Scope', 'Proxy',
  'JDK动态代理', 'CGLIB', 'AspectJ', 'Pointcut', 'Advice', 'JoinPoint', 'Weaving', 'Introduction', 'Target', 'Introduction',
  '消息', '事件', '通知', '广播', '点对点', '发布订阅', '主题', '队列', '交换器', '绑定',
  '路由键', '死信', '延迟', '优先级', 'TTL', '最大长度', '溢出', '惰性', '持久', '镜像',
  '仲裁', '流', '分区', '副本', '领导者', '追随者', 'ISR', '选举', '重平衡', '消费者组',
  '偏移量', '提交', '回滚', ' exactly-once', 'at-least-once', 'at-most-once', '幂等生产者', '事务生产者', '流处理', '表',
  '窗口', '会话', '跳跃', '滑动', '翻滚', ' punctuated', '时间', '水位线', '迟到', '侧输出',
  'CEP', '模式', '匹配', '复杂事件', '规则引擎', 'Drools', 'Esper', 'Siddhi', 'FlinkCEP', '状态机',
  '工作流', 'BPMN', 'Camunda', 'Activiti', 'Flowable', 'jBPM', 'Airflow', 'Dagster', 'Prefect', 'Luigi',
  'Cron', '调度', '触发器', '依赖', 'DAG', '节点', '边', '拓扑', '排序', '关键路径',
  '甘特图', 'PERT', 'CPM', '资源', '约束', '优化', '线性规划', '整数规划', '混合整数', '二次规划',
  '凸优化', '非凸', '梯度下降', '牛顿法', '拟牛顿', '共轭梯度', '坐标下降', '次梯度', '近端', 'ADMM',
  '对偶', '拉格朗日', 'KKT', '松弛', '对偶间隙', '原始', '互补', 'Slater', '强对偶', '弱对偶',
  '博弈论', '纳什均衡', '占优策略', '混合策略', '零和', '非零和', '合作', '非合作', '拍卖', '机制设计',
  '激励相容', '个体理性', '社会最优', '帕累托', '福利', '效用', '偏好', '选择', '显示', '揭示',
  '投票', '聚合', '孔多塞', '波达', '认可', '范围', '多数', '比例', '单可转移', '黑尔',
  'Droop', '配额', '剩余', '转移', '淘汰', '决胜', '两轮', '排序', '评分', '成对',
  '图论', '顶点', '边', '路径', '环', '树', '森林', '连通', '强连通', '弱连通',
  '二分', '匹配', '覆盖', '独立集', '团', '着色', '平面图', '欧拉', '哈密顿', '最短路径',
  'Dijkstra', 'BellmanFord', 'FloydWarshall', 'A星', '最小生成树', 'Prim', 'Kruskal', '拓扑排序', '强连通分量', 'Tarjan',
  'Kosaraju', '桥', '割点', '双连通', '网络流', '最大流', '最小割', 'EdmondsKarp', 'Dinic', 'ISAP',
  '费用流', '最小费用', '循环流', '可行流', '预流推进', 'HLPP', '匹配', '匈牙利', 'KM', ' blossom',
  '字符串', 'KMP', 'Z函数', 'Manacher', '后缀数组', '后缀树', '后缀自动机', 'AC自动机', 'Trie', 'Radix',
  '滚动哈希', '双哈希', '多项式', '指纹', '布隆过滤器', 'CountMin', 'HyperLogLog', 'CMS', 'TopK', 'HeavyHitter',
  '基数估计', '频率估计', '范围查询', '区间树', '线段树', '树状数组', '稀疏表', '分块', '莫队', '主席树',
  '可持久化', '函数式', 'Treap', 'Splay', 'AVL', '红黑树', 'B树', 'B+树', 'LSM', '跳表',
  '哈希表', '开放寻址', '链地址', '再哈希', '一致性', '虚拟节点', ' Rendezvous', '最小完美', '布谷鸟', 'RobinHood',
  '线性探测', '二次探测', '双重哈希', '布隆', '计数', '可逆', 'XOR', 'Cuckoo', 'Quotient', 'FKS',
  '完美哈希', '全域', 'k独立', '双通用', '左偏', '斜堆', '二项堆', '斐波那契', '配对', '软堆',
  '并查集', '路径压缩', '按秩合并', 'Tarjan', '离线', '在线', '动态', '静态', '增量', '减量',
  '完全动态', '部分动态', '几何', '凸包', 'Graham', 'Jarvis', 'Chan', '旋转卡壳', '半平面', 'Voronoi',
  'Delaunay', '三角剖分', 'k-d树', 'R树', '四叉树', '八叉树', '网格', '哈希', '局部敏感', 'SimHash',
  'MinHash', 'Shingling', 'Jaccard', '余弦', '欧氏', '曼哈顿', '切比雪夫', '闵可夫斯基', '马氏', '汉明',
  '编辑', 'Levenshtein', 'Damerau', 'Jaro', 'Winkler', '最长公共', '最短公共', '差异', ' Myers', 'Patience',
  'Histogram', 'Minimal', '语义', '结构', '语法', '抽象', '具体', '解析', '词法', '语法分析',
  'LL', 'LR', 'SLR', 'LALR', 'GLR', 'Earley', 'CYK', 'Packrat', 'PEG', '递归下降',
  '算符优先', '预测', '移进', '归约', '冲突', '歧义', '优先级', '结合性', '语义动作', '属性',
  'S', 'L', '继承', '综合', '翻译', '中间', '三地址', '四元式', '三元式', '间接',
  'SSA', '基本块', '流图', '支配', '边界', 'phi', '插入', '重命名', '变量', '活跃',
  '到达', '可用', '非常忙', '预期', '部分冗余', '完全冗余', '死代码', '常量传播', '拷贝传播', '公共子式',
  '强度削弱', '归纳变量', '循环不变', '代码外提', '循环展开', '循环分裂', '软件流水', '向量化', 'SIMD', 'SSE',
  'AVX', 'NEON', 'OpenMP', 'MPI', 'CUDA', 'OpenCL', 'HIP', 'SYCL', 'oneAPI', 'TBB',
  'PPL', 'GCD', 'libdispatch', 'GrandCentral', '线程池', '工作窃取', '任务', '延续', '纤程', '协程',
  '绿色线程', 'M:N', '用户态', '内核态', '上下文切换', '调度', '抢占', '协作', '时间片', '轮转',
  '优先级', '多级反馈', '完全公平', 'CFS', '实时', 'EDF', 'RMS', 'LLF', '最早截止', '速率单调',
  '带宽', '利用率', '可调度', '响应时间', '最坏执行', '最好执行', '平均执行', '抖动', '漂移', '偏移',
  '同步', '互斥', '信号', '事件', '条件', '屏障', '栅栏', '闩锁', 'Phaser', 'Exchanger',
  'TransferQueue', 'SynchronousQueue', 'DelayQueue', 'PriorityBlocking', 'LinkedBlocking', 'ArrayBlocking', 'Concurrent', 'CopyOnWrite', 'SkipList', 'ConcurrentHash',
  'LongAdder', 'DoubleAdder', 'Striped', 'StampedLock', 'ReadWrite', 'Reentrant', 'Semaphore', 'CountDown', 'CyclicBarrier', 'Phaser',
  'CompletableFuture', 'CompletionStage', 'thenApply', 'thenCompose', 'thenCombine', 'allOf', 'anyOf', 'exceptionally', 'handle', 'whenComplete',
  'Flow', 'Publisher', 'Subscriber', 'Subscription', 'Processor', 'Reactive', 'RxJava', 'Reactor', 'Project', 'Vert.x',
  'Akka', 'Erlang', 'Elixir', 'OTP', 'GenServer', 'Supervisor', 'Application', 'Release', 'HotCode', 'Remote',
  'RPC', 'gRPC', 'Thrift', 'Avro', 'Protobuf', 'MessagePack', 'FlatBuffers', 'CapnProto', 'BSON', 'CBOR',
  'XML', 'JSON', 'YAML', 'TOML', 'INI', 'CSV', 'TSV', 'Parquet', 'ORC', 'Arrow',
  'Avro', 'Thrift', 'Protocol', 'IDL', 'Schema', '演进', '兼容', '前向', '后向', '全兼容',
  '序列化', '反序列化', '编解码', '压缩', '解压', 'Gzip', 'Bzip2', 'LZ4', 'Zstd', 'Snappy',
  'Deflate', 'Inflate', 'LZW', 'Huffman', '算术', 'Range', 'ANS', 'FSE', 'Entropy', 'RLE',
  'Delta', 'XOR', '字典', 'LZ77', 'LZ78', 'LZW', 'BWT', 'MTF', 'PPM', 'DMC',
  '神经网络压缩', '学习', '隐式', '显式', '有损', '无损', '渐进', '分层', '感兴趣', 'ROI',
  'ROI', '感兴趣区域', '质量', '率失真', 'PSNR', 'SSIM', 'VMAF', 'MOS', '主观', '客观',
  '编码器', '解码器', '转码', '封装', '解封装', '复用', '解复用', '码率', '帧率', '分辨率',
  '采样率', '声道', '位深', '色深', '色域', 'HDR', 'SDR', '广色域', 'Rec2020', 'Rec709',
  'DCI-P3', 'sRGB', 'AdobeRGB', 'ProPhoto', 'ACES', '线性', '对数', 'Gamma', 'LUT', '色彩空间',
  'CIE', 'XYZ', 'Lab', 'Luv', 'YUV', 'YCbCr', 'RGB', 'CMYK', 'HSV', 'HSL',
  '色相', '饱和度', '明度', '亮度', '对比度', '锐度', '降噪', '去雾', '防抖', '超分',
  '插值', '采样', '重采样', '下采样', '上采样', '池化', '反池化', '转置卷积', '空洞', '可变形',
  '注意力机制', '自注意力', '多头', '位置编码', '相对位置', '绝对位置', '旋转位置', 'RoPE', 'ALiBi', 'NTK',
  '外推', '内插', '长度泛化', '上下文学习', '少样本', '零样本', '思维链', 'CoT', 'ToT', 'GoT',
  'ReAct', 'Reflexion', 'SelfConsistency', 'TreeOfThought', 'GraphOfThought', 'PlanAndSolve', 'LeastToMost', 'StepBack', 'TabCoT', 'Program',
  'PAL', 'Toolformer', 'Gorilla', 'APIBench', 'Function', 'Plugin', 'Action', 'ToolUse', 'CodeInterpreter', 'Multimodal',
  '视觉', '听觉', '触觉', '嗅觉', '味觉', '多感官', '跨模态', '模态对齐', '融合', '桥接',
  '对比学习', 'CLIP', 'ALIGN', 'BLIP', 'LLaVA', 'MiniGPT', 'InstructBLIP', 'QwenVL', 'YiVL', 'CogVLM',
  '语音', 'ASR', 'TTS', '声纹', 'Speaker', 'Diarization', '分离', '增强', '降噪', '回声消除',
  '音乐', '生成', '风格迁移', '音色克隆', '歌声合成', 'SVS', 'MIDI', '乐谱', '和弦', '旋律',
  '节奏', '节拍', '速度', '力度', '表情', '装饰音', '连音', '断音', '强弱', '渐强',
  '渐弱', '延长', '休止', '反复', '跳跃', '尾声', '前奏', '间奏', '华彩', '即兴',
  '作曲', '编曲', '配器', '混音', '母带', '均衡', '压缩', '限制', '扩展', '门限',
  '混响', '延迟', '合唱', '镶边', '相位', '失真', '过载', 'fuzz', 'wah', 'tremolo',
  'vibrato', 'pan', '立体声', '单声道', '环绕声', '全景声', '杜比', 'DTS', 'THX', '空间音频',
  'HRTF', 'Ambisonics', '波场合成', '对象音频', '场景音频', '交互音频', '程序化', '自适应', '动态', '分层',
  '混合', '过渡', '淡入', '淡出', '交叉淡化', '时间拉伸', '音高变换', '变调', '变速', '共振峰',
  '声码器', '相位声码', '颗粒合成', '波表', 'FM', 'AM', '减法', '加法', '物理建模', '采样回放',
  '波导', '数字波导', '有限差分', '模态合成', '源滤波器', 'LPC', 'CELP', 'ACELP', 'AMR', 'EVS',
  'Opus', 'AAC', 'MP3', 'Vorbis', 'FLAC', 'ALAC', 'WAV', 'AIFF', 'PCM', 'DSD',
  'MQA', 'aptX', 'LDAC', 'LHDC', 'LC3', 'SBC', 'mSBC', 'CVSD', 'uLaw', 'aLaw',
  'G711', 'G722', 'G729', 'G726', 'AMRNB', 'AMRWB', 'EVRC', 'VMRWB', 'iLBC', 'Speex',
  'Silk', 'CELT', 'RTP', 'RTCP', 'SRTP', 'DTLS', 'ICE', 'STUN', 'TURN', 'NAT',
  '穿透', '打洞', '中继', '候选', '优先级', '配对', '连通性', '保活', '心跳', '重传',
  'NACK', 'FEC', 'ARQ', 'HARQ', '前向纠错', '自动重传', '混合', '类型', '卷积', '里德所罗门',
  'BCH', 'LDPC', 'Polar', 'Turbo', 'Viterbi', 'BCJR', 'MAP', 'ML', 'MMSE', 'ZF',
  'MRC', 'EGC', 'SC', 'OSIC', 'BLAST', 'MIMO', 'OFDM', 'SCFDMA', 'CDMA', 'TDMA',
  'FDMA', 'OFDMA', 'NOMA', 'RSMA', 'SDMA', '波束成形', '预编码', '检测', '均衡', '信道估计',
  '导频', '参考信号', '同步', '定时', '频偏', '相位噪声', 'IQ不平衡', 'DC偏移', '镜像', '杂散',
  '互调', '谐波', '相位', '群延迟', '幅度', '频率', '带宽', '动态范围', '信噪比', '噪声系数',
  '灵敏度', '选择性', '线性度', '效率', '功耗', '散热', '封装', '工艺', '制程', '节点',
  '纳米', 'FinFET', 'GAA', 'MBCFET', 'CFET', '2D', '3D', '单片', '异构', 'Chiplet',
  'UCIe', 'BoW', 'PHY', 'SerDes', 'PLL', 'DLL', 'CDR', '均衡器', 'CTLE', 'DFE',
  'FFE', '预加重', '去加重', '眼图', '抖动', '误码率', ' bathtub', '浴盆', '裕量', '裕度',
  '建立', '保持', '亚稳态', '同步器', '握手', '异步FIFO', '格雷码', '指针', '空满', '深度',
  '宽度', '位宽', '数据通路', '控制通路', '状态机', 'FSM', 'Moore', 'Mealy', 'Harel', 'UML',
  'SysML', 'AADL', 'MARTE', 'AUTOSAR', 'Simulink', 'Stateflow', 'LabVIEW', 'SCADE', 'Lustre', 'Esterel',
  '同步语言', '数据流', 'Kahn', 'SDF', 'CSDF', 'BDF', 'DDF', '动态数据流', '进程网络', 'CSP',
  'Actor', 'Reo', 'Ptolemy', 'ForSyDe', 'SystemC', 'TLM', 'AT', 'LT', ' loosely-timed', ' approximately-timed',
  ' cycle-accurate', 'RTL', '门级', '晶体管级', 'SPICE', 'Verilog', 'VHDL', 'SystemVerilog', 'UVM', 'OVM',
  'VMM', 'Specman', 'e语言', 'PSL', 'SVA', '形式验证', '模型检测', '定理证明', 'SAT', 'SMT',
  'BMC', 'K-induction', 'IC3', 'PDR', 'CEGAR', '抽象解释', '静态分析', '符号执行', '模糊测试', '混合执行',
  'concolic', '污点分析', '信息流', '依赖', '切片', '程序分析', '指针分析', '别名分析', '逃逸分析', '形状分析',
  '分离逻辑', '霍尔逻辑', '最弱前置', '最强后置', '循环不变', '秩函数', '终止性', '活性', '安全性', '可达性',
  '公平性', '无饥饿', '互斥', '死锁自由', '活锁自由', '无竞争', '顺序一致性', '因果一致性', '最终一致性', '线性一致性',
  '顺序', '因果', 'PRAM', '处理器', '缓存', '释放', '获取', 'RCpc', 'RCsc', 'TSO',
  'PSO', 'RMO', 'Alpha', 'ARM', 'Power', 'Itanium', 'RISC-V', '宽松', '弱序', '强序',
  '全序', '偏序', 'HappensBefore', 'SynchronizesWith', 'DependencyOrderedBefore', 'InterThread', 'IntraThread', 'SequencedBefore', 'CarriesDependency', 'Consume',
  'Acquire', 'Release', 'AcqRel', 'SeqCst', 'Relaxed', 'Fences', 'Barriers', 'SFence', 'LFence', 'MFence',
  'DMB', 'DSB', 'ISB', 'Sync', 'Lwsync', 'Eieio', 'Membar', 'Fence', 'Compiler', 'CPU',
  'Cache', 'Coherence', 'MESI', 'MOESI', 'MOSI', 'MESIF', 'Dragon', 'Firefly', 'Berkeley', '监听',
  '嗅探', '目录', '基于目录', '分布式共享', 'NUMA', 'UMA', 'CCNUMA', 'COMA', 'NORMA', 'SMP',
  'AMP', 'BMP', '多核', '众核', ' manycore', 'GPU', 'TPU', 'NPU', 'DPU', 'IPU',
  'VPU', 'QPU', 'FPGA', 'ASIC', 'SoC', 'SiP', 'MCP', 'PoP', '3DIC', '2.5D',
  'Interposer', 'EMIB', 'CoWoS', 'HBM', 'HMC', 'WideIO', 'LPDDR', 'DDR', 'GDDR', 'LPDDR5',
  'DDR5', 'GDDR6', 'HBM2', 'HBM3', 'CXL', 'CCIX', 'GenZ', 'NVLink', 'InfinityFabric', 'UPI',
  'QPI', 'HT', 'PCIe', 'USB', 'Thunderbolt', 'SATA', 'SAS', 'NVMe', 'AHCI', 'IDE',
  'SCSI', 'FC', 'iSCSI', 'FCoE', 'RDMA', 'InfiniBand', 'RoCE', 'iWARP', 'OmniPath', 'Slingshot',
  'Tofu', 'Aries', 'Gemini', 'Seastar', 'DPDK', 'SPDK', 'VPP', 'FD.io', 'eBPF', 'XDP',
  'TC', 'iptables', 'nftables', 'netfilter', 'conntrack', 'NAT', 'MASQUERADE', 'SNAT', 'DNAT', 'REDIRECT',
  'TPROXY', '负载均衡', 'LVS', 'HAProxy', 'Nginx', 'Envoy', 'Traefik', 'Caddy', 'Varnish', 'Squid',
  'ATS', 'TrafficServer', 'ATS', 'Nginx', 'OpenResty', 'Tengine', 'Apache', 'Tomcat', 'Jetty', 'Undertow',
  'Netty', 'Vert.x', 'WebFlux', 'WebSocket', 'Socket.IO', 'SockJS', 'STOMP', 'MQTT', 'CoAP', 'LwM2M',
  'HTTP', 'HTTP2', 'HTTP3', 'QUIC', 'TLS', 'TCP', 'UDP', 'SCTP', 'DCCP', 'RTP',
  'RTSP', 'RTMP', 'HLS', 'DASH', 'WebRTC', 'WebTransport', 'WebCodecs', 'MediaSource', 'EncryptedMedia', 'WebAudio',
  'Canvas', 'WebGL', 'WebGPU', 'WebAssembly', 'WASM', 'WASI', 'ComponentModel', 'InterfaceTypes', 'ModuleLinking', 'Threads',
  'SIMD', 'ExceptionHandling', 'GarbageCollection', 'TailCall', 'ReferenceTypes', 'MultiValue', 'BulkMemory', 'Nontrapping', 'SignExtension', 'MutableGlobal',
  'JSAPI', 'WebAPI', 'DOM', 'BOM', 'CSSOM', 'ShadowDOM', 'CustomElements', 'Template', 'Slot', 'Declarative',
  'Imperative', 'Reactive', 'Signals', 'Observables', 'Streams', 'Iterators', 'Generators', 'AsyncIterators', 'AsyncGenerators', 'ForAwait',
  'TopLevelAwait', 'DynamicImport', 'ImportMeta', 'ImportAssertions', 'JSONModules', 'CSSModules', 'WasmModules', 'ModuleWorkers', 'SharedWorkers', 'ServiceWorkers',
  'PWA', 'Manifest', 'WebApp', 'Install', 'Standalone', 'Fullscreen', 'MinimalUI', 'Browser', 'Display', 'Orientation',
  'ThemeColor', 'BackgroundColor', 'Icons', 'Screenshots', 'Shortcuts', 'Categories', 'Description', 'Scope', 'StartURL', 'ID',
  'Credentials', 'Password', 'WebAuthn', 'FIDO', 'FIDO2', 'U2F', 'CTAP', 'Authenticator', 'Attestation', 'Assertion',
  'ResidentKey', 'Discoverable', 'UserVerification', 'ClientPIN', 'HMAC', 'PRF', 'LargeBlob', 'CredProps', 'Extensions', 'Payment',
  'WebPayment', 'PaymentRequest', 'PaymentHandler', 'PaymentMethod', 'BasicCard', 'GooglePay', 'ApplePay', 'Stripe', 'PayPal', 'Alipay',
  'WeChatPay', 'UnionPay', 'Crypto', 'WebCrypto', 'SubtleCrypto', 'CryptoKey', 'KeyPair', 'JWK', 'SPKI', 'PKCS8',
  'Raw', 'PBKDF2', 'HKDF', 'ECDH', 'ECDSA', 'Ed25519', 'X25519', 'RSA-OAEP', 'RSA-PSS', 'AES-GCM',
  'AES-CBC', 'AES-CTR', 'AES-KW', 'HMAC', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512', 'MD5', 'RIPEMD',
  'Blake2', 'Blake3', 'Keccak', 'SHA-3', 'SHAKE', 'cSHAKE', 'KMAC', 'TupleHash', 'ParallelHash', 'SPHINCS',
  'Dilithium', 'Falcon', 'Kyber', 'NTRU', 'ClassicMcEliece', 'BIKE', 'HQC', 'FrodoKEM', 'NTRUPrime', 'SIKE',
  'SIDH', 'CSIDH', 'Isogeny', 'Lattice', 'Code', 'Hash', 'Multivariate', 'Supersingular', 'Elliptic', 'Curve',
  'Pairing', 'BLS', 'BN', 'MNT', 'KSS', 'BLS12-381', 'BLS12-377', 'BN254', 'BN256', 'SECP256K1',
  'SECP256R1', 'SECP384R1', 'SECP521R1', 'Curve25519', 'Curve448', 'Ed25519', 'Ed448', 'X25519', 'X448', 'Brainpool',
  'ANSSI', 'NIST', 'FIPS', 'CommonCriteria', 'EAL', 'ISO', 'IEC', 'ITU', 'IEEE', 'IETF',
  'W3C', 'WHATWG', 'ECMA', 'TC39', 'Unicode', 'ISO10646', 'UTF-8', 'UTF-16', 'UTF-32', 'GBK',
  'GB2312', 'GB18030', 'Big5', 'ShiftJIS', 'EUC-JP', 'EUC-KR', 'ISO-8859', 'Windows', 'CodePage', 'ASCII',
  '控制字符', '可打印', '空白', '换行', '回车', '制表', '空格', '非断', '零宽', '连接',
  '双向', 'RTL', 'LTR', '嵌入', '覆盖', '隔离', '强', '弱', '中性', '镜像',
  ' shaping', 'OpenType', 'TrueType', 'PostScript', 'Type1', 'Type3', 'CFF', 'CFF2', 'WOFF', 'WOFF2',
  'EOT', 'SVG', 'COLR', 'CBDT', 'SBIX', '可变字体', '轴', '实例', '设计空间', '插值',
  'Hinting', 'GridFitting', '子像素', '灰度', '抗锯齿', 'ClearType', 'FreeType', 'HarfBuzz', 'Pango', 'CoreText',
  'DirectWrite', 'GDI', 'Uniscribe', 'TextLayout', '排版', '断行', '断词', '连字', '字距', '字偶距',
  '追踪', '基线', 'x高度', '升部', '降部', 'cap高度', '行高', '行距', '段距', '缩进',
  '对齐', '两端', '左对齐', '右对齐', '居中', '分散', 'Tab', '制表位', '列表', '编号',
  '项目符号', '多级', '大纲', '目录', '索引', '脚注', '尾注', '批注', '修订', '比较',
  '合并', '拆分', '保护', '限制', '模板', '样式', '主题', '母版', '版式', '占位符',
  '内容控件', '域', '书签', '超链接', '交叉引用', '题注', '图表', '公式', '符号', '特殊字符',
  '艺术字', 'SmartArt', '形状', '线条', '连接符', '流程图', '标注', '星与旗帜', '标注', '动作',
  '动画', '切换', '母版', '讲义', '备注', '幻灯片', '节', '节标题', '标题', '正文',
  '页眉', '页脚', '页码', '页边距', '纸张', '方向', '分栏', '分隔符', '分节符', '连续',
  '偶数页', '奇数页', '首页', '水印', '背景', '边框', '底纹', '填充', '渐变', '图案',
  '纹理', '图片', '效果', '阴影', '反射', '发光', '柔化', '棱台', '三维', '旋转',
  '裁剪', '压缩', '调整', '校正', '颜色', '艺术效果', '删除背景', '透明度', '亮度', '对比度',
  '饱和度', '色调', '温度', '着色', '锐化', '模糊', '去斑', '去噪', '颗粒', '胶片',
  '光晕', '暗角', '鱼眼', '扭曲', '挤压', '球面', '波浪', '玻璃', '马赛克', '油画',
  '素描', '蜡笔', '水彩', '塑封', '影印', '发光边缘', '查找边缘', '等高线', '风', '浮雕',
  '扩散', '曝光过度', '照亮', '霓虹', '拼图', '拼图', '纹理化', '裂纹', '染色玻璃', '马赛克拼贴',
];

const SENTENCE_PATTERNS = [
  '{topic}是{field}领域中非常重要的概念，它{verb}了{target}的{aspect}。',
  '在{field}中，{topic}被广泛应用于{scenario}，这极大地{verb}了{target}。',
  '{topic}的核心思想是通过{method}来{goal}，从而实现{result}。',
  '研究表明，{topic}能够显著{verb}{target}的{aspect}，尤其是在{scenario}中。',
  '{field}的发展离不开{topic}，它为{target}提供了{aspect}。',
  '通过{method}，{topic}可以有效地{goal}，这在{scenario}中尤为重要。',
  '{topic}的优势在于其{aspect}，这使得它在{field}中占据重要地位。',
  '尽管{topic}面临一些挑战，但它在{scenario}中的表现仍然{adj}。',
  '{topic}与{topic2}的结合，为{field}带来了新的{aspect}。',
  '未来，{topic}将在{scenario}中发挥更加重要的作用，{verb}{target}的{aspect}。',
];

const PARAGRAPH_PATTERNS = [
  '{sentence}\n{sentence}\n{sentence}',
  '{sentence}\n\n{sentence}\n{sentence}',
];

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSentence() {
  const pattern = randomPick(SENTENCE_PATTERNS);
  return pattern
    .replace('{topic}', randomPick(WORDS))
    .replace('{topic2}', randomPick(WORDS))
    .replace('{field}', randomPick(WORDS))
    .replace('{verb}', randomPick(['提升', '改善', '优化', '增强', '促进', '推动', '加速', '深化', '拓展', '革新']))
    .replace('{target}', randomPick(WORDS))
    .replace('{aspect}', randomPick(['效率', '性能', '质量', '稳定性', '可靠性', '可扩展性', '灵活性', '安全性', '用户体验', '生产力']))
    .replace('{scenario}', randomPick(['实际应用', '生产环境', '大规模系统', '实时处理', '分布式场景', '边缘计算', '云端部署', '移动端', '物联网', '自动驾驶']))
    .replace('{method}', randomPick(['算法优化', '架构重构', '协议改进', '模型训练', '数据驱动', '并行计算', '异步处理', '缓存策略', '索引优化', '压缩技术']))
    .replace('{goal}', randomPick(['提高吞吐量', '降低延迟', '减少资源消耗', '增强容错能力', '简化部署流程', '提升可维护性', '加强安全防护', '优化存储结构', '改进查询效率', '增强并发能力']))
    .replace('{result}', randomPick(['显著的性能提升', '更好的用户体验', '更低的运营成本', '更高的系统可用性', '更强的市场竞争力', '更快的迭代速度', '更优的资源利用率', '更稳的服务质量', '更广的应用场景', '更深的行业渗透']))
    .replace('{adj}', randomPick(['出色', '令人满意', '超出预期', '令人瞩目', '令人印象深刻', '值得肯定', '可圈可点', '表现优异', '效果显著', '令人振奋']));
}

function generateParagraph() {
  const pattern = randomPick(PARAGRAPH_PATTERNS);
  const sentenceCount = randomInt(2, 4);
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }
  return pattern.replace(/{sentence}/g, () => sentences.shift());
}

function generateHeading(level) {
  const prefixes = ['#', '##', '###', '####'];
  const topics = [
    '概述', '背景', '原理', '实现', '优化', '应用', '挑战', '展望',
    '案例分析', '性能评估', '对比研究', '最佳实践', '常见问题', '解决方案',
    '架构设计', '核心算法', '关键技术', '创新点', '实验结果', '总结',
  ];
  return `${prefixes[level - 1]} ${randomPick(WORDS)}${randomPick(topics)}`;
}

function generateList() {
  const items = randomInt(3, 6);
  const lines = [];
  for (let i = 0; i < items; i++) {
    lines.push(`- ${generateSentence()}`);
  }
  return lines.join('\n');
}

function generateCodeBlock() {
  const langs = ['javascript', 'python', 'rust', 'go', 'java', 'typescript', 'cpp', 'bash'];
  const lang = randomPick(langs);
  const snippets = {
    javascript: [
      'const data = await fetch("/api/data");\nconst result = await data.json();\nconsole.log(result);',
      'function optimize(arr) {\n  return arr.filter(x => x > 0).map(x => x * 2);\n}',
      'class Cache {\n  constructor() { this.store = new Map(); }\n  get(key) { return this.store.get(key); }\n}',
    ],
    python: [
      'def process_data(data):\n    return [x for x in data if x > 0]',
      'import asyncio\nasync def main():\n    await asyncio.sleep(1)',
      'class DataProcessor:\n    def __init__(self):\n        self.cache = {}',
    ],
    rust: [
      'fn main() {\n    let vec = vec![1, 2, 3];\n    println!("{:?}", vec);\n}',
      'async fn fetch_data() -> Result<String, Error> {\n    Ok("data".to_string())\n}',
    ],
    go: [
      'func main() {\n    fmt.Println("Hello, World!")\n}',
      'func process(ch chan int) {\n    for v := range ch {\n        fmt.Println(v)\n    }\n}',
    ],
    java: [
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}',
      'public List<String> filter(List<String> list) {\n    return list.stream().filter(s -> !s.isEmpty()).collect(Collectors.toList());\n}',
    ],
    typescript: [
      'interface User {\n  id: number;\n  name: string;\n}\nconst user: User = { id: 1, name: "test" };',
      'async function fetchData<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  return res.json();\n}',
    ],
    cpp: [
      'int main() {\n    std::vector<int> vec = {1, 2, 3};\n    return 0;\n}',
      'template<typename T>\nclass Container {\n    std::vector<T> data;\n};',
    ],
    bash: [
      '#!/bin/bash\necho "Processing started"\nfor f in *.txt; do\n  cat "$f"\ndone',
      'find . -name "*.js" -type f | xargs grep -l "TODO"',
    ],
  };
  return '```' + lang + '\n' + randomPick(snippets[lang]) + '\n```';
}

function generateTable() {
  const headers = ['指标', '数值', '单位', '备注'];
  const rows = randomInt(3, 6);
  const lines = [
    '| ' + headers.join(' | ') + ' |',
    '|' + headers.map(() => '------').join('|') + '|',
  ];
  for (let i = 0; i < rows; i++) {
    lines.push(`| ${randomPick(WORDS)} | ${randomInt(10, 1000)} | ${randomPick(['ms', 'MB', 'GB', 'TPS', 'QPS', '%'])} | ${randomPick(WORDS)} |`);
  }
  return lines.join('\n');
}

function generateQuote() {
  return `> ${generateSentence()}\n> \n> —— ${randomPick(WORDS)}`;
}

function generateImageRef(imageDir, index) {
  const captions = [
    '系统架构图', '性能对比', '流程示意', '数据可视化', '界面截图',
    '网络拓扑', '时序图', '状态转换', '类图', '部署方案',
  ];
  return `![${randomPick(captions)}](${imageDir}/image_${index}.jpg)\n\n*图 ${index}：${randomPick(captions)}*`;
}

function generateBlock() {
  const type = randomInt(1, 7);
  switch (type) {
    case 1: return generateParagraph();
    case 2: return generateList();
    case 3: return generateCodeBlock();
    case 4: return generateTable();
    case 5: return generateQuote();
    case 6: return generateHeading(randomInt(2, 4));
    default: return generateParagraph();
  }
}

function generateDocument(targetChars, imageCount, imageDir) {
  const blocks = [];
  let currentChars = 0;
  let imageIndex = 0;
  let sectionCount = 0;

  blocks.push('# 大型技术文档测试');
  blocks.push('');
  blocks.push(generateParagraph());
  blocks.push('');

  while (currentChars < targetChars) {
    if (sectionCount % 5 === 0 && sectionCount > 0) {
      blocks.push('');
      blocks.push(generateHeading(randomInt(2, 3)));
      blocks.push('');
    }

    if (imageIndex < imageCount && Math.random() < 0.15) {
      blocks.push(generateImageRef(imageDir, imageIndex));
      blocks.push('');
      imageIndex++;
    }

    const block = generateBlock();
    blocks.push(block);
    blocks.push('');
    currentChars += block.length;
    sectionCount++;
  }

  return blocks.join('\n');
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const targetChars = parseInt(args[0]) || 100000;
  const imageCount = parseInt(args[1]) || 20;
  const outputDir = args[2] || './test-assets';
  const imageDir = path.join(outputDir, 'images');

  console.log(`Generating test document...`);
  console.log(`Target: ${targetChars} characters, ${imageCount} images`);
  console.log(`Output: ${outputDir}`);

  await mkdir(imageDir, { recursive: true });

  const imageUrls = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4',
    'https://picsum.photos/800/600?random=5',
    'https://picsum.photos/800/600?random=6',
    'https://picsum.photos/800/600?random=7',
    'https://picsum.photos/800/600?random=8',
    'https://picsum.photos/800/600?random=9',
    'https://picsum.photos/800/600?random=10',
  ];

  console.log('Downloading images...');
  for (let i = 0; i < imageCount; i++) {
    const url = imageUrls[i % imageUrls.length] + `&t=${i}`;
    const filepath = path.join(imageDir, `image_${i}.jpg`);
    try {
      await downloadImage(url, filepath);
      process.stdout.write(`.`);
    } catch (err) {
      process.stdout.write(`x`);
      const placeholder = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect fill="%23ddd" width="800" height="600"/><text x="50%" y="50%" text-anchor="middle" font-size="24">Image ${i}</text></svg>`;
      fs.writeFileSync(filepath.replace('.jpg', '.svg'), placeholder);
    }
  }
  console.log('\n');

  console.log('Generating document...');
  const doc = generateDocument(targetChars, imageCount, './images');

  const outputPath = path.join(outputDir, 'large-test-doc.md');
  await writeFile(outputPath, doc, 'utf-8');

  const stats = fs.statSync(outputPath);
  console.log(`\nDocument generated successfully!`);
  console.log(`File: ${outputPath}`);
  console.log(`Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`Characters: ${doc.length}`);
  console.log(`Images referenced: ${imageCount}`);
}

main().catch(console.error);
