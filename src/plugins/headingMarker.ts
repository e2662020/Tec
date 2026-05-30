import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Node } from 'prosemirror-model';

const headingMarkerKey = new PluginKey<DecorationSet>('headingMarker');

function buildDecorations(state: { doc: Node; selection: { $from: { depth: number; node: (d: number) => Node; pos: number } } }): DecorationSet {
  const decos: Decoration[] = [];
  const { $from } = state.selection;

  state.doc.descendants((node, pos) => {
    if (node.type.name === 'heading') {
      const level = node.attrs.level as number;
      const hashStr = '#'.repeat(level);

      let cursorInHeading = false;
      for (let d = $from.depth; d >= 0; d--) {
        if ($from.node(d) === node) { cursorInHeading = true; break; }
      }

      const marker = document.createElement('span');
      marker.className = 'heading-marker';
      marker.setAttribute('contenteditable', 'false');
      marker.setAttribute('data-level', String(level));
      marker.textContent = hashStr + ' ';
      if (cursorInHeading) {
        marker.style.opacity = '0.6';
      }

      decos.push(Decoration.widget(pos + 1, marker, {
        side: -1,
      }));
    }
  });

  return DecorationSet.create(state.doc, decos);
}

export function headingMarkerPlugin() {
  return new Plugin<DecorationSet>({
    key: headingMarkerKey,

    state: {
      init: (_, state) => buildDecorations(state),
      apply: (tr, old, _, state) => {
        if (tr.docChanged || tr.selectionSet) {
          return buildDecorations(state);
        }
        return old.map(tr.mapping, tr.doc);
      },
    },

    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });
}
