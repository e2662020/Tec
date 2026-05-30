#!/usr/bin/env python3
"""
生成 MDX 压力测试文件
参考 DESIGN.md 的 .mdx 格式规范：
- ZIP 包结构
- content.md 正文
- assets/ 目录存放 hash 命名的 webp 图片
- manifest.json 图片元数据
- theme.json 主题引用
- color_map.json 颜色映射
- meta.json 文档元数据
"""

import os
import sys
import json
import hashlib
import random
import zipfile
import tempfile
import shutil
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.error import HTTPError
from concurrent.futures import ThreadPoolExecutor, as_completed

# ============ 配置 ============
WORDS = [
    "计算机", "程序", "设计", "开发", "系统", "应用", "软件", "硬件", "网络", "数据",
    "算法", "结构", "模型", "框架", "平台", "服务", "接口", "协议", "安全", "性能",
    "优化", "测试", "部署", "维护", "升级", "配置", "管理", "监控", "日志", "备份",
    "恢复", "同步", "异步", "并发", "并行", "分布式", "集群", "容器", "虚拟化", "云计算",
    "大数据", "人工智能", "机器学习", "深度学习", "神经网络", "自然语言", "图像识别", "语音识别", "推荐系统", "搜索引擎",
    "数据库", "缓存", "消息队列", "事件驱动", "微服务", "服务网格", "网关", "负载均衡", "熔断", "限流",
    "降级", "隔离", "超时", "重试", "幂等", "事务", "一致性", "可用性", "分区容忍", "CAP",
    "BASE", "ACID", "SQL", "NoSQL", "文档", "键值", "列族", "图数据库", "时序", "关系型",
    "索引", "查询", "聚合", "排序", "过滤", "分页", "缓存穿透", "缓存击穿", "缓存雪崩", "热点",
    "冷数据", "温数据", "归档", "压缩", "加密", "解密", "签名", "验签", "证书", "令牌",
    "认证", "授权", "鉴权", "审计", "合规", "隐私", "脱敏", "掩码", "哈希", "摘要",
    "对称加密", "非对称加密", "公钥", "私钥", "数字信封", "SSL", "TLS", "HTTPS", "SSH", "VPN",
    "防火墙", "入侵检测", "漏洞扫描", "渗透测试", "安全审计", "风险评估", "应急响应", "灾备", "高可用", "容灾",
    "监控告警", "链路追踪", "性能分析", "瓶颈", "调优", "扩容", "缩容", "弹性", "自动化", "DevOps",
    "CI/CD", "持续集成", "持续交付", "持续部署", "蓝绿部署", "金丝雀", "灰度", "A/B测试", "功能开关", "特性管理",
    "版本控制", "Git", "分支", "合并", "冲突", "回滚", "标签", "发布", "迭代", "敏捷",
    "Scrum", "Kanban", "看板", "冲刺", "backlog", "用户故事", "需求", "原型", "设计稿", "UI",
    "UX", "交互", "视觉", "动效", "响应式", "自适应", "移动端", "桌面端", "Web", "小程序",
    "App", "iOS", "Android", "Flutter", "ReactNative", "跨平台", "混合应用", "PWA", "SPA", "SSR",
    "CSR", "同构", "渲染", "虚拟DOM", "diff", "补丁", "更新", "状态", "属性", "事件",
    "生命周期", "钩子", "组件", "模块", "包", "库", "工具", "插件", "扩展", "生态",
    "社区", "开源", "贡献", "协议", "许可", "版权", "专利", "商标", "品牌", "文档",
    "注释", "规范", "风格", "格式化", "Lint", "类型检查", "单元测试", "集成测试", "端到端", "回归",
    "覆盖率", "变异测试", "契约测试", "混沌工程", "故障注入", "压力测试", "负载测试", "容量测试", "稳定性", "可靠性",
    "可维护性", "可扩展性", "可移植性", "兼容性", "互操作性", "标准化", "规范化", "最佳实践", "模式", "反模式",
    "重构", "技术债", "代码异味", "圈复杂度", "耦合度", "内聚性", "SOLID", "DRY", "KISS", "YAGNI",
    "面向对象", "函数式", "响应式", "声明式", "命令式", "泛型", "多态", "继承", "封装", "抽象",
    "接口隔离", "依赖注入", "控制反转", "工厂模式", "单例", "观察者", "发布订阅", "策略", "装饰器", "代理",
    "适配器", "桥接", "组合", "外观", "享元", "职责链", "命令", "解释器", "迭代器", "中介者",
    "备忘录", "原型", "访问者", "状态", "模板方法", "建造者", "抽象工厂", "原型链", "闭包", "作用域",
    "上下文", "执行栈", "事件循环", "回调", "Promise", "async", "await", "生成器", "迭代器", "Symbol",
    "Reflect", "Proxy", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "TypedArray", "DataView", "JSON",
    "正则表达式", "字符串", "数组", "对象", "函数", "类", "模块", "命名空间", "类型", "接口",
    "枚举", "联合", "交叉", "泛型约束", "条件类型", "映射类型", "工具类型", "推断", "断言", "守卫",
    "装饰器", "元数据", "反射", "序列化", "反序列化", "深拷贝", "浅拷贝", "冻结", "密封", "扩展",
    "原型污染", "原型链污染", "XSS", "CSRF", "SQL注入", "命令注入", "路径遍历", "文件包含", "反序列化漏洞", "SSRF",
    "点击劫持", "中间人", "重放攻击", "暴力破解", "字典攻击", "彩虹表", "盐值", "pepper", "密钥派生", "双因素",
    "生物识别", "行为分析", "风控", "反欺诈", "验证码", "滑块", "点选", "旋转", "语义", "行为",
    "设备指纹", "环境检测", "模拟器", "Root", "越狱", "Hook", "注入", "调试", "反调试", "混淆",
    "加固", "壳", "脱壳", "逆向", "反编译", "反汇编", "静态分析", "动态分析", "符号执行", "污点分析",
    "模糊测试", "漏洞挖掘", "漏洞利用", "Exploit", "Shellcode", "ROP", "JOP", "COP", "堆喷射", "UseAfterFree",
    "缓冲区溢出", "整数溢出", "格式化字符串", "类型混淆", "UAF", "DoubleFree", "内存泄漏", "悬垂指针", "野指针", "越界",
    "竞争条件", "死锁", "活锁", "饥饿", "优先级反转", "ABA问题", "内存屏障", "原子操作", "锁", "信号量",
    "互斥量", "读写锁", "自旋锁", "条件变量", "屏障", "栅栏", "闩锁", "Phaser", "Exchanger",
    "TransferQueue", "SynchronousQueue", "DelayQueue", "PriorityBlocking", "LinkedBlocking", "ArrayBlocking", "Concurrent", "CopyOnWrite", "SkipList", "ConcurrentHash",
    "LongAdder", "DoubleAdder", "Striped", "StampedLock", "ReadWrite", "Reentrant", "Semaphore", "CountDown", "CyclicBarrier", "Phaser",
    "CompletableFuture", "CompletionStage", "thenApply", "thenCompose", "thenCombine", "allOf", "anyOf", "exceptionally", "handle", "whenComplete",
    "Flow", "Publisher", "Subscriber", "Subscription", "Processor", "Reactive", "RxJava", "Reactor", "Project", "Vert.x",
    "Akka", "Erlang", "Elixir", "OTP", "GenServer", "Supervisor", "Application", "Release", "HotCode", "Remote",
    "RPC", "gRPC", "Thrift", "Avro", "Protobuf", "MessagePack", "FlatBuffers", "CapnProto", "BSON", "CBOR",
    "XML", "JSON", "YAML", "TOML", "INI", "CSV", "TSV", "Parquet", "ORC", "Arrow",
    "Avro", "Thrift", "Protocol", "IDL", "Schema", "演进", "兼容", "前向", "后向", "全兼容",
    "序列化", "反序列化", "编解码", "压缩", "解压", "Gzip", "Bzip2", "LZ4", "Zstd", "Snappy",
    "Deflate", "Inflate", "LZW", "Huffman", "算术", "Range", "ANS", "FSE", "Entropy", "RLE",
    "Delta", "XOR", "字典", "LZ77", "LZ78", "LZW", "BWT", "MTF", "PPM", "DMC",
    "神经网络压缩", "学习", "隐式", "显式", "有损", "无损", "渐进", "分层", "感兴趣", "ROI",
    "感兴趣区域", "质量", "率失真", "PSNR", "SSIM", "VMAF", "MOS", "主观", "客观",
    "编码器", "解码器", "转码", "封装", "解封装", "复用", "解复用", "码率", "帧率", "分辨率",
    "采样率", "声道", "位深", "色深", "色域", "HDR", "SDR", "广色域", "Rec2020", "Rec709",
    "DCI-P3", "sRGB", "AdobeRGB", "ProPhoto", "ACES", "线性", "对数", "Gamma", "LUT", "色彩空间",
    "CIE", "XYZ", "Lab", "Luv", "YUV", "YCbCr", "RGB", "CMYK", "HSV", "HSL",
    "色相", "饱和度", "明度", "亮度", "对比度", "锐度", "降噪", "去雾", "防抖", "超分",
    "插值", "采样", "重采样", "下采样", "上采样", "池化", "反池化", "转置卷积", "空洞", "可变形",
    "注意力机制", "自注意力", "多头", "位置编码", "相对位置", "绝对位置", "旋转位置", "RoPE", "ALiBi", "NTK",
    "外推", "内插", "长度泛化", "上下文学习", "少样本", "零样本", "思维链", "CoT", "ToT", "GoT",
    "ReAct", "Reflexion", "SelfConsistency", "TreeOfThought", "GraphOfThought", "PlanAndSolve", "LeastToMost", "StepBack", "TabCoT", "Program",
    "PAL", "Toolformer", "Gorilla", "APIBench", "Function", "Plugin", "Action", "ToolUse", "CodeInterpreter", "Multimodal",
    "视觉", "听觉", "触觉", "嗅觉", "味觉", "多感官", "跨模态", "模态对齐", "融合", "桥接",
    "对比学习", "CLIP", "ALIGN", "BLIP", "LLaVA", "MiniGPT", "InstructBLIP", "QwenVL", "YiVL", "CogVLM",
    "语音", "ASR", "TTS", "声纹", "Speaker", "Diarization", "分离", "增强", "降噪", "回声消除",
    "音乐", "生成", "风格迁移", "音色克隆", "歌声合成", "SVS", "MIDI", "乐谱", "和弦", "旋律",
    "节奏", "节拍", "速度", "力度", "表情", "装饰音", "连音", "断音", "强弱", "渐强",
    "渐弱", "延长", "休止", "反复", "跳跃", "尾声", "前奏", "间奏", "华彩", "即兴",
    "作曲", "编曲", "配器", "混音", "母带", "均衡", "压缩", "限制", "扩展", "门限",
    "混响", "延迟", "合唱", "镶边", "相位", "失真", "过载", "fuzz", "wah", "tremolo",
    "vibrato", "pan", "立体声", "单声道", "环绕声", "全景声", "杜比", "DTS", "THX", "空间音频",
    "HRTF", "Ambisonics", "波场合成", "对象音频", "场景音频", "交互音频", "程序化", "自适应", "动态", "分层",
    "混合", "过渡", "淡入", "淡出", "交叉淡化", "时间拉伸", "音高变换", "变调", "变速", "共振峰",
    "声码器", "相位声码", "颗粒合成", "波表", "FM", "AM", "减法", "加法", "物理建模", "采样回放",
    "波导", "数字波导", "有限差分", "模态合成", "源滤波器", "LPC", "CELP", "ACELP", "AMR", "EVS",
    "Opus", "AAC", "MP3", "Vorbis", "FLAC", "ALAC", "WAV", "AIFF", "PCM", "DSD",
    "MQA", "aptX", "LDAC", "LHDC", "LC3", "SBC", "mSBC", "CVSD", "uLaw", "aLaw",
    "G711", "G722", "G729", "G726", "AMRNB", "AMRWB", "EVRC", "VMRWB", "iLBC", "Speex",
    "Silk", "CELT", "RTP", "RTCP", "SRTP", "DTLS", "ICE", "STUN", "TURN", "NAT",
    "穿透", "打洞", "中继", "候选", "优先级", "配对", "连通性", "保活", "心跳", "重传",
    "NACK", "FEC", "ARQ", "HARQ", "前向纠错", "自动重传", "混合", "类型", "卷积", "里德所罗门",
    "BCH", "LDPC", "Polar", "Turbo", "Viterbi", "BCJR", "MAP", "ML", "MMSE", "ZF",
    "MRC", "EGC", "SC", "OSIC", "BLAST", "MIMO", "OFDM", "SCFDMA", "CDMA", "TDMA",
    "FDMA", "OFDMA", "NOMA", "RSMA", "SDMA", "波束成形", "预编码", "检测", "均衡", "信道估计",
    "导频", "参考信号", "同步", "定时", "频偏", "相位噪声", "IQ不平衡", "DC偏移", "镜像", "杂散",
    "互调", "谐波", "相位", "群延迟", "幅度", "频率", "带宽", "动态范围", "信噪比", "噪声系数",
    "灵敏度", "选择性", "线性度", "效率", "功耗", "散热", "封装", "工艺", "制程", "节点",
    "纳米", "FinFET", "GAA", "MBCFET", "CFET", "2D", "3D", "单片", "异构", "Chiplet",
    "UCIe", "BoW", "PHY", "SerDes", "PLL", "DLL", "CDR", "均衡器", "CTLE", "DFE",
    "FFE", "预加重", "去加重", "眼图", "抖动", "误码率", "bathtub", "浴盆", "裕量", "裕度",
    "建立", "保持", "亚稳态", "同步器", "握手", "异步FIFO", "格雷码", "指针", "空满", "深度",
    "宽度", "位宽", "数据通路", "控制通路", "状态机", "FSM", "Moore", "Mealy", "Harel", "UML",
    "SysML", "AADL", "MARTE", "AUTOSAR", "Simulink", "Stateflow", "LabVIEW", "SCADE", "Lustre", "Esterel",
    "同步语言", "数据流", "Kahn", "SDF", "CSDF", "BDF", "DDF", "动态数据流", "进程网络", "CSP",
    "Actor", "Reo", "Ptolemy", "ForSyDe", "SystemC", "TLM", "AT", "LT", "loosely-timed", "approximately-timed",
    "cycle-accurate", "RTL", "门级", "晶体管级", "SPICE", "Verilog", "VHDL", "SystemVerilog", "UVM", "OVM",
    "VMM", "Specman", "e语言", "PSL", "SVA", "形式验证", "模型检测", "定理证明", "SAT", "SMT",
    "BMC", "K-induction", "IC3", "PDR", "CEGAR", "抽象解释", "静态分析", "符号执行", "模糊测试", "混合执行",
    "concolic", "污点分析", "信息流", "依赖", "切片", "程序分析", "指针分析", "别名分析", "逃逸分析", "形状分析",
    "分离逻辑", "霍尔逻辑", "最弱前置", "最强后置", "循环不变", "秩函数", "终止性", "活性", "安全性", "可达性",
    "公平性", "无饥饿", "互斥", "死锁自由", "活锁自由", "无竞争", "顺序一致性", "因果一致性", "最终一致性", "线性一致性",
    "顺序", "因果", "PRAM", "处理器", "缓存", "释放", "获取", "RCpc", "RCsc", "TSO",
    "PSO", "RMO", "Alpha", "ARM", "Power", "Itanium", "RISC-V", "宽松", "弱序", "强序",
    "全序", "偏序", "HappensBefore", "SynchronizesWith", "DependencyOrderedBefore", "InterThread", "IntraThread", "SequencedBefore", "CarriesDependency", "Consume",
    "Acquire", "Release", "AcqRel", "SeqCst", "Relaxed", "Fences", "Barriers", "SFence", "LFence", "MFence",
    "DMB", "DSB", "ISB", "Sync", "Lwsync", "Eieio", "Membar", "Fence", "Compiler", "CPU",
    "Cache", "Coherence", "MESI", "MOESI", "MOSI", "MESIF", "Dragon", "Firefly", "Berkeley", "监听",
    "嗅探", "目录", "基于目录", "分布式共享", "NUMA", "UMA", "CCNUMA", "COMA", "NORMA", "SMP",
    "AMP", "BMP", "多核", "众核", "manycore", "GPU", "TPU", "NPU", "DPU", "IPU",
    "VPU", "QPU", "FPGA", "ASIC", "SoC", "SiP", "MCP", "PoP", "3DIC", "2.5D",
    "Interposer", "EMIB", "CoWoS", "HBM", "HMC", "WideIO", "LPDDR", "DDR", "GDDR", "LPDDR5",
    "DDR5", "GDDR6", "HBM2", "HBM3", "CXL", "CCIX", "GenZ", "NVLink", "InfinityFabric", "UPI",
    "QPI", "HT", "PCIe", "USB", "Thunderbolt", "SATA", "SAS", "NVMe", "AHCI", "IDE",
    "SCSI", "FC", "iSCSI", "FCoE", "RDMA", "InfiniBand", "RoCE", "iWARP", "OmniPath", "Slingshot",
    "Tofu", "Aries", "Gemini", "Seastar", "DPDK", "SPDK", "VPP", "FD.io", "eBPF", "XDP",
    "TC", "iptables", "nftables", "netfilter", "conntrack", "NAT", "MASQUERADE", "SNAT", "DNAT", "REDIRECT",
    "TPROXY", "负载均衡", "LVS", "HAProxy", "Nginx", "Envoy", "Traefik", "Caddy", "Varnish", "Squid",
    "ATS", "TrafficServer", "Nginx", "OpenResty", "Tengine", "Apache", "Tomcat", "Jetty", "Undertow",
    "Netty", "Vert.x", "WebFlux", "WebSocket", "Socket.IO", "SockJS", "STOMP", "MQTT", "CoAP", "LwM2M",
    "HTTP", "HTTP2", "HTTP3", "QUIC", "TLS", "TCP", "UDP", "SCTP", "DCCP", "RTP",
    "RTSP", "RTMP", "HLS", "DASH", "WebRTC", "WebTransport", "WebCodecs", "MediaSource", "EncryptedMedia", "WebAudio",
    "Canvas", "WebGL", "WebGPU", "WebAssembly", "WASM", "WASI", "ComponentModel", "InterfaceTypes", "ModuleLinking", "Threads",
    "SIMD", "ExceptionHandling", "GarbageCollection", "TailCall", "ReferenceTypes", "MultiValue", "BulkMemory", "Nontrapping", "SignExtension", "MutableGlobal",
    "JSAPI", "WebAPI", "DOM", "BOM", "CSSOM", "ShadowDOM", "CustomElements", "Template", "Slot", "Declarative",
    "Imperative", "Reactive", "Signals", "Observables", "Streams", "Iterators", "Generators", "AsyncIterators", "AsyncGenerators", "ForAwait",
    "TopLevelAwait", "DynamicImport", "ImportMeta", "ImportAssertions", "JSONModules", "CSSModules", "WasmModules", "ModuleWorkers", "SharedWorkers", "ServiceWorkers",
    "PWA", "Manifest", "WebApp", "Install", "Standalone", "Fullscreen", "MinimalUI", "Browser", "Display", "Orientation",
    "ThemeColor", "BackgroundColor", "Icons", "Screenshots", "Shortcuts", "Categories", "Description", "Scope", "StartURL", "ID",
    "Credentials", "Password", "WebAuthn", "FIDO", "FIDO2", "U2F", "CTAP", "Authenticator", "Attestation", "Assertion",
    "ResidentKey", "Discoverable", "UserVerification", "ClientPIN", "HMAC", "PRF", "LargeBlob", "CredProps", "Extensions", "Payment",
    "WebPayment", "PaymentRequest", "PaymentHandler", "PaymentMethod", "BasicCard", "GooglePay", "ApplePay", "Stripe", "PayPal", "Alipay",
    "WeChatPay", "UnionPay", "Crypto", "WebCrypto", "SubtleCrypto", "CryptoKey", "KeyPair", "JWK", "SPKI", "PKCS8",
    "Raw", "PBKDF2", "HKDF", "ECDH", "ECDSA", "Ed25519", "X25519", "RSA-OAEP", "RSA-PSS", "AES-GCM",
    "AES-CBC", "AES-CTR", "AES-KW", "HMAC", "SHA-1", "SHA-256", "SHA-384", "SHA-512", "MD5", "RIPEMD",
    "Blake2", "Blake3", "Keccak", "SHA-3", "SHAKE", "cSHAKE", "KMAC", "TupleHash", "ParallelHash", "SPHINCS",
    "Dilithium", "Falcon", "Kyber", "NTRU", "ClassicMcEliece", "BIKE", "HQC", "FrodoKEM", "NTRUPrime", "SIKE",
    "SIDH", "CSIDH", "Isogeny", "Lattice", "Code", "Hash", "Multivariate", "Supersingular", "Elliptic", "Curve",
    "Pairing", "BLS", "BN", "MNT", "KSS", "BLS12-381", "BLS12-377", "BN254", "BN256", "SECP256K1",
    "SECP256R1", "SECP384R1", "SECP521R1", "Curve25519", "Curve448", "Ed25519", "Ed448", "X25519", "X448", "Brainpool",
    "ANSSI", "NIST", "FIPS", "CommonCriteria", "EAL", "ISO", "IEC", "ITU", "IEEE", "IETF",
    "W3C", "WHATWG", "ECMA", "TC39", "Unicode", "ISO10646", "UTF-8", "UTF-16", "UTF-32", "GBK",
    "GB2312", "GB18030", "Big5", "ShiftJIS", "EUC-JP", "EUC-KR", "ISO-8859", "Windows", "CodePage", "ASCII",
    "控制字符", "可打印", "空白", "换行", "回车", "制表", "空格", "非断", "零宽", "连接",
    "双向", "RTL", "LTR", "嵌入", "覆盖", "隔离", "强", "弱", "中性", "镜像",
    "shaping", "OpenType", "TrueType", "PostScript", "Type1", "Type3", "CFF", "CFF2", "WOFF", "WOFF2",
    "EOT", "SVG", "COLR", "CBDT", "SBIX", "可变字体", "轴", "实例", "设计空间", "插值",
    "Hinting", "GridFitting", "子像素", "灰度", "抗锯齿", "ClearType", "FreeType", "HarfBuzz", "Pango", "CoreText",
    "DirectWrite", "GDI", "Uniscribe", "TextLayout", "排版", "断行", "断词", "连字", "字距", "字偶距",
    "追踪", "基线", "x高度", "升部", "降部", "cap高度", "行高", "行距", "段距", "缩进",
    "对齐", "两端", "左对齐", "右对齐", "居中", "分散", "Tab", "制表位", "列表", "编号",
    "项目符号", "多级", "大纲", "目录", "索引", "脚注", "尾注", "批注", "修订", "比较",
    "合并", "拆分", "保护", "限制", "模板", "样式", "主题", "母版", "版式", "占位符",
    "内容控件", "域", "书签", "超链接", "交叉引用", "题注", "图表", "公式", "符号", "特殊字符",
    "艺术字", "SmartArt", "形状", "线条", "连接符", "流程图", "标注", "星与旗帜", "标注", "动作",
    "动画", "切换", "母版", "讲义", "备注", "幻灯片", "节", "节标题", "标题", "正文",
    "页眉", "页脚", "页码", "页边距", "纸张", "方向", "分栏", "分隔符", "分节符", "连续",
    "偶数页", "奇数页", "首页", "水印", "背景", "边框", "底纹", "填充", "渐变", "图案",
    "纹理", "图片", "效果", "阴影", "反射", "发光", "柔化", "棱台", "三维", "旋转",
    "裁剪", "压缩", "调整", "校正", "颜色", "艺术效果", "删除背景", "透明度", "亮度", "对比度",
    "饱和度", "色调", "温度", "着色", "锐化", "模糊", "去斑", "去噪", "颗粒", "胶片",
    "光晕", "暗角", "鱼眼", "扭曲", "挤压", "球面", "波浪", "玻璃", "马赛克", "油画",
    "素描", "蜡笔", "水彩", "塑封", "影印", "发光边缘", "查找边缘", "等高线", "风", "浮雕",
    "扩散", "曝光过度", "照亮", "霓虹", "拼图", "拼图", "纹理化", "裂纹", "染色玻璃", "马赛克拼贴",
]

SENTENCE_PATTERNS = [
    "{topic}是{field}领域中非常重要的概念，它{verb}了{target}的{aspect}。",
    "在{field}中，{topic}被广泛应用于{scenario}，这极大地{verb}了{target}。",
    "{topic}的核心思想是通过{method}来{goal}，从而实现{result}。",
    "研究表明，{topic}能够显著{verb}{target}的{aspect}，尤其是在{scenario}中。",
    "{field}的发展离不开{topic}，它为{target}提供了{aspect}。",
    "通过{method}，{topic}可以有效地{goal}，这在{scenario}中尤为重要。",
    "{topic}的优势在于其{aspect}，这使得它在{field}中占据重要地位。",
    "尽管{topic}面临一些挑战，但它在{scenario}中的表现仍然{adj}。",
    "{topic}与{topic2}的结合，为{field}带来了新的{aspect}。",
    "未来，{topic}将在{scenario}中发挥更加重要的作用，{verb}{target}的{aspect}。",
]

VERBS = ["提升", "改善", "优化", "增强", "促进", "推动", "加速", "深化", "拓展", "革新"]
TARGETS = ["效率", "性能", "质量", "稳定性", "可靠性", "可扩展性", "灵活性", "安全性", "用户体验", "生产力"]
SCENARIOS = ["实际应用", "生产环境", "大规模系统", "实时处理", "分布式场景", "边缘计算", "云端部署", "移动端", "物联网", "自动驾驶"]
METHODS = ["算法优化", "架构重构", "协议改进", "模型训练", "数据驱动", "并行计算", "异步处理", "缓存策略", "索引优化", "压缩技术"]
GOALS = ["提高吞吐量", "降低延迟", "减少资源消耗", "增强容错能力", "简化部署流程", "提升可维护性", "加强安全防护", "优化存储结构", "改进查询效率", "增强并发能力"]
RESULTS = ["显著的性能提升", "更好的用户体验", "更低的运营成本", "更高的系统可用性", "更强的市场竞争力", "更快的迭代速度", "更优的资源利用率", "更稳的服务质量", "更广的应用场景", "更深的行业渗透"]
ADJS = ["出色", "令人满意", "超出预期", "令人瞩目", "令人印象深刻", "值得肯定", "可圈可点", "表现优异", "效果显著", "令人振奋"]

CODE_LANGS = ["javascript", "python", "rust", "go", "java", "typescript", "cpp", "bash"]
CODE_SNIPPETS = {
    "javascript": [
        'const data = await fetch("/api/data");\nconst result = await data.json();\nconsole.log(result);',
        'function optimize(arr) {\n  return arr.filter(x => x > 0).map(x => x * 2);\n}',
        'class Cache {\n  constructor() { this.store = new Map(); }\n  get(key) { return this.store.get(key); }\n}',
    ],
    "python": [
        'def process_data(data):\n    return [x for x in data if x > 0]',
        'import asyncio\nasync def main():\n    await asyncio.sleep(1)',
        'class DataProcessor:\n    def __init__(self):\n        self.cache = {}',
    ],
    "rust": [
        'fn main() {\n    let vec = vec![1, 2, 3];\n    println!("{:?}", vec);\n}',
        'async fn fetch_data() -> Result<String, Error> {\n    Ok("data".to_string())\n}',
    ],
    "go": [
        'func main() {\n    fmt.Println("Hello, World!")\n}',
        'func process(ch chan int) {\n    for v := range ch {\n        fmt.Println(v)\n    }\n}',
    ],
    "java": [
        'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello");\n    }\n}',
        'public List<String> filter(List<String> list) {\n    return list.stream().filter(s -> !s.isEmpty()).collect(Collectors.toList());\n}',
    ],
    "typescript": [
        'interface User {\n  id: number;\n  name: string;\n}\nconst user: User = { id: 1, name: "test" };',
        'async function fetchData<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  return res.json();\n}',
    ],
    "cpp": [
        'int main() {\n    std::vector<int> vec = {1, 2, 3};\n    return 0;\n}',
        'template<typename T>\nclass Container {\n    std::vector<T> data;\n};',
    ],
    "bash": [
        '#!/bin/bash\necho "Processing started"\nfor f in *.txt; do\n  cat "$f"\ndone',
        'find . -name "*.js" -type f | xargs grep -l "TODO"',
    ],
}

# ============ 随机生成函数 ============
def random_pick(arr):
    return random.choice(arr)

def random_int(min_val, max_val):
    return random.randint(min_val, max_val)

def generate_sentence():
    pattern = random_pick(SENTENCE_PATTERNS)
    return pattern.replace("{topic}", random_pick(WORDS)) \
        .replace("{topic2}", random_pick(WORDS)) \
        .replace("{field}", random_pick(WORDS)) \
        .replace("{verb}", random_pick(VERBS)) \
        .replace("{target}", random_pick(WORDS)) \
        .replace("{aspect}", random_pick(TARGETS)) \
        .replace("{scenario}", random_pick(SCENARIOS)) \
        .replace("{method}", random_pick(METHODS)) \
        .replace("{goal}", random_pick(GOALS)) \
        .replace("{result}", random_pick(RESULTS)) \
        .replace("{adj}", random_pick(ADJS))

def generate_paragraph():
    count = random_int(2, 4)
    return "\n".join(generate_sentence() for _ in range(count))

def generate_heading(level):
    prefixes = ["#", "##", "###", "####"]
    topics = ["概述", "背景", "原理", "实现", "优化", "应用", "挑战", "展望",
              "案例分析", "性能评估", "对比研究", "最佳实践", "常见问题", "解决方案",
              "架构设计", "核心算法", "关键技术", "创新点", "实验结果", "总结"]
    return f"{prefixes[level - 1]} {random_pick(WORDS)}{random_pick(topics)}"

def generate_list():
    items = random_int(3, 6)
    return "\n".join(f"- {generate_sentence()}" for _ in range(items))

def generate_code_block():
    lang = random_pick(CODE_LANGS)
    return f"```{lang}\n{random_pick(CODE_SNIPPETS[lang])}\n```"

def generate_table():
    headers = ["指标", "数值", "单位", "备注"]
    rows = random_int(3, 6)
    lines = [
        "| " + " | ".join(headers) + " |",
        "|" + "|".join(["------"] * len(headers)) + "|",
    ]
    for _ in range(rows):
        lines.append(f"| {random_pick(WORDS)} | {random_int(10, 1000)} | {random_pick(['ms', 'MB', 'GB', 'TPS', 'QPS', '%'])} | {random_pick(WORDS)} |")
    return "\n".join(lines)

def generate_quote():
    return f"> {generate_sentence()}\n> \n> —— {random_pick(WORDS)}"

def generate_colored_text():
    colors = ["R", "G", "B", "O", "P", "Y", "C", "K", "W", "H"]
    color = random_pick(colors)
    return f"&{color}{generate_sentence()}&{color}"

def generate_columns():
    col_count = random_int(2, 3)
    lines = [f"||{col_count}"]
    for i in range(col_count):
        lines.append(generate_paragraph())
        if i < col_count - 1:
            lines.append("||")
    lines.append("|||")
    return "\n\n".join(lines)

def generate_align():
    aligns = [
        f"=== {generate_sentence()} ===",
        f">>> {generate_sentence()} >>>",
        f"<<< {generate_sentence()} <<<",
    ]
    return random_pick(aligns)

def generate_latex():
    if random.random() < 0.5:
        return f"$E = mc^2$"
    else:
        return f"$$\\int_{{-\\infty}}^{{\\infty}} e^{{-x^2}} dx = \\sqrt{{\\pi}}$$"

def generate_image_ref(asset_hash, index):
    captions = [
        "系统架构图", "性能对比", "流程示意", "数据可视化", "界面截图",
        "网络拓扑", "时序图", "状态转换", "类图", "部署方案",
    ]
    return f"![{random_pick(captions)}](assets/{asset_hash}.webp)\n\n*图 {index}：{random_pick(captions)}*"

def generate_block():
    type_val = random_int(1, 12)
    match type_val:
        case 1: return generate_paragraph()
        case 2: return generate_list()
        case 3: return generate_code_block()
        case 4: return generate_table()
        case 5: return generate_quote()
        case 6: return generate_heading(random_int(2, 4))
        case 7: return generate_colored_text()
        case 8: return generate_columns()
        case 9: return generate_align()
        case 10: return generate_latex()
        case _: return generate_paragraph()

def generate_content_md(target_chars, image_hashes):
    blocks = []
    current_chars = 0
    image_index = 0
    section_count = 0

    blocks.append("# 大型技术文档压力测试")
    blocks.append("")
    blocks.append(generate_paragraph())
    blocks.append("")

    while current_chars < target_chars:
        if section_count % 5 == 0 and section_count > 0:
            blocks.append("")
            blocks.append(generate_heading(random_int(2, 3)))
            blocks.append("")

        if image_index < len(image_hashes) and random.random() < 0.12:
            blocks.append(generate_image_ref(image_hashes[image_index], image_index))
            blocks.append("")
            image_index += 1

        block = generate_block()
        blocks.append(block)
        blocks.append("")
        current_chars += len(block)
        section_count += 1

    return "\n".join(blocks)

# ============ 图片下载与处理 ============
def download_image(url, filepath):
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=30) as resp:
            with open(filepath, "wb") as f:
                f.write(resp.read())
        return True
    except Exception as e:
        print(f"Download failed: {e}")
        return False

def create_placeholder_image(filepath, index):
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
<rect fill="%23ddd" width="800" height="600"/>
<text x="50%" y="50%" text-anchor="middle" font-size="24" fill="%23333">Image {index}</text>
</svg>'''
    with open(filepath, "w") as f:
        f.write(svg)

def compute_file_hash(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()[:8]

def convert_to_webp(input_path, output_path):
    try:
        from PIL import Image
        img = Image.open(input_path)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(output_path, "WEBP", quality=75, method=6)
        return True
    except ImportError:
        shutil.copy(input_path, output_path)
        return False
    except Exception as e:
        print(f"WebP conversion failed: {e}")
        shutil.copy(input_path, output_path)
        return False

def download_and_process_images(image_count, assets_dir):
    os.makedirs(assets_dir, exist_ok=True)
    image_urls = [
        "https://picsum.photos/800/600",
        "https://picsum.photos/1200/800",
        "https://picsum.photos/600/800",
        "https://picsum.photos/1024/768",
        "https://picsum.photos/768/1024",
    ]

    manifests = {}
    hashes = []

    print(f"Downloading {image_count} images...")

    def process_one(i):
        url = f"{random_pick(image_urls)}?random={i}"
        temp_path = os.path.join(assets_dir, f"temp_{i}.jpg")

        if not download_image(url, temp_path):
            create_placeholder_image(temp_path, i)

        file_hash = compute_file_hash(temp_path)
        webp_path = os.path.join(assets_dir, f"{file_hash}.webp")

        convert_to_webp(temp_path, webp_path)
        os.remove(temp_path)

        size = os.path.getsize(webp_path)
        manifests[file_hash] = {
            "original_name": f"photo_{i}.jpg",
            "hash": file_hash,
            "similar_group": f"grp_{i % 10:02d}",
            "is_primary": i % 3 == 0,
            "mtime": "2026-05-30T10:00:00Z",
            "compressed": True,
            "size_bytes": size,
        }
        return file_hash

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(process_one, i): i for i in range(image_count)}
        for future in as_completed(futures):
            i = futures[future]
            try:
                h = future.result()
                hashes.append(h)
                print(f".", end="", flush=True)
            except Exception as e:
                print(f"x", end="", flush=True)

    print(f"\nDownloaded {len(hashes)} images")
    return hashes, manifests

# ============ MDX 打包 ============
def create_mdx(output_path, content_md, image_hashes, manifests, theme_name="Tec Light"):
    tmpdir = tempfile.mkdtemp()
    try:
        assets_dir = os.path.join(tmpdir, "assets")
        os.makedirs(assets_dir, exist_ok=True)

        # 写入 content.md
        with open(os.path.join(tmpdir, "content.md"), "w", encoding="utf-8") as f:
            f.write(content_md)

        # 复制图片到 assets
        src_assets = os.path.join(os.path.dirname(output_path), "assets")
        for h in image_hashes:
            src = os.path.join(src_assets, f"{h}.webp")
            dst = os.path.join(assets_dir, f"{h}.webp")
            if os.path.exists(src):
                shutil.copy2(src, dst)

        # manifest.json
        with open(os.path.join(assets_dir, "manifest.json"), "w", encoding="utf-8") as f:
            json.dump(manifests, f, ensure_ascii=False, indent=2)

        # theme.json
        theme_data = {"name": theme_name, "builtin": True}
        with open(os.path.join(tmpdir, "theme.json"), "w", encoding="utf-8") as f:
            json.dump(theme_data, f, ensure_ascii=False, indent=2)

        # color_map.json
        color_map = {
            "R": "#E74C3C", "G": "#2ECC71", "B": "#3498DB",
            "O": "#E67E22", "P": "#9B59B6", "Y": "#F1C40F",
            "C": "#1ABC9C", "K": "#2C3E50", "W": "#95A5A6",
            "H": "#E91E63",
        }
        with open(os.path.join(tmpdir, "color_map.json"), "w", encoding="utf-8") as f:
            json.dump(color_map, f, ensure_ascii=False, indent=2)

        # meta.json
        meta = {
            "version": "1.0",
            "created": "2026-05-30T10:00:00Z",
            "modified": "2026-05-30T10:00:00Z",
            "syntax_extensions": ["colored-text", "columns", "align", "latex"],
            "plugin_data": {},
            "word_count": len(content_md),
            "image_count": len(image_hashes),
        }
        with open(os.path.join(tmpdir, "meta.json"), "w", encoding="utf-8") as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)

        # 打包为 ZIP (Store 压缩)
        with zipfile.ZipFile(output_path, "w", zipfile.ZIP_STORED) as zf:
            for root, _, files in os.walk(tmpdir):
                for file in files:
                    filepath = os.path.join(root, file)
                    arcname = os.path.relpath(filepath, tmpdir)
                    zf.write(filepath, arcname)

        return True
    finally:
        shutil.rmtree(tmpdir)

# ============ 主函数 ============
def main():
    target_chars = int(sys.argv[1]) if len(sys.argv) > 1 else 100000
    image_count = int(sys.argv[2]) if len(sys.argv) > 2 else 100
    output_dir = sys.argv[3] if len(sys.argv) > 3 else "./test-assets"

    print(f"=" * 60)
    print(f"Tec MDX 压力测试文件生成器")
    print(f"=" * 60)
    print(f"目标字数: {target_chars}")
    print(f"图片数量: {image_count}")
    print(f"输出目录: {output_dir}")
    print(f"=" * 60)

    os.makedirs(output_dir, exist_ok=True)
    assets_dir = os.path.join(output_dir, "assets")

    # 1. 下载并处理图片
    image_hashes, manifests = download_and_process_images(image_count, assets_dir)

    # 2. 生成 content.md
    print(f"\nGenerating content.md...")
    content_md = generate_content_md(target_chars, image_hashes)
    print(f"Content generated: {len(content_md)} characters")

    # 3. 打包为 MDX
    print(f"\nPacking MDX...")
    mdx_path = os.path.join(output_dir, "stress-test.mdx")
    create_mdx(mdx_path, content_md, image_hashes, manifests)

    # 4. 输出统计
    mdx_size = os.path.getsize(mdx_path)
    print(f"\n{'=' * 60}")
    print(f"MDX 文件生成成功!")
    print(f"{'=' * 60}")
    print(f"文件: {mdx_path}")
    print(f"大小: {mdx_size / 1024:.2f} KB ({mdx_size / 1024 / 1024:.2f} MB)")
    print(f"字数: {len(content_md)}")
    print(f"图片: {len(image_hashes)} 张")
    print(f"{'=' * 60}")

if __name__ == "__main__":
    main()
