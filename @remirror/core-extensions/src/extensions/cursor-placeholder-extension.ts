import { Extension, getPluginMeta, getPluginState } from "@remirror/core";
import {EditorState, Plugin} from 'prosemirror-state';
import {Decoration, DecorationSet} from 'prosemirror-view';

/**
 * Applies a placeholder to a position in the document for actions that might take a while to complete.
 *
 * An example of this would be uploading an image. From time the command is given to upload the image to when it
 * finally completes a lot can happen in the editor. This extension and it's helper function can help with this situation.
 */
export class CursorPlaceholderExtension extends Extension {
  get name() {
    return 'cursorPlaceholder';
  }

  public plugin() {
    return new Plugin<DecorationSet>({
      key: this.pluginKey,
      state: {
        init() {
          return DecorationSet.empty;
        },
        apply: (tr, decorationSet) => {
          decorationSet = decorationSet.map(tr.mapping, tr.doc);
          const action = getPluginMeta<CursorPlaceholderMeta>(this.pluginKey, tr);
          if (!action) {
            return decorationSet;
          }
          if (action.add) {
            const widget = document.createElement('remirror-cursor-placeholder');
            widget.className = 'remirror-cursor-placeholder';
            const deco = Decoration.widget(action.add.pos, widget, {
              id: PLACE_HOLDER_ID,
            });
            decorationSet = decorationSet.add(tr.doc, [deco]);
          } else if (action.remove) {
            const found = decorationSet.find(undefined, undefined, specFinder);
            decorationSet = decorationSet.remove(found);
          }

          return decorationSet;
        },
      },
      props: {
        decorations: state => {
          return getPluginState(this.pluginKey, state);
        },
      },
    })
  }
}

interface CursorPlaceholderMeta {
  add?: {
    pos: number;
  },
  remove?: {
    pos: number
  }
}




const PLACE_HOLDER_ID = {name: 'CursorPlaceholderPlugin'};

const singletonInstance = null;

// https://prosemirror.net/examples/upload/




function specFinder(spec: Object): boolean {
  return spec.id === PLACE_HOLDER_ID;
}

function findCursorPlaceholderPos(state: EditorState): ?number {
  if (!singletonInstance) {
    return null;
  }
  const decos = singletonInstance.getState(state);
  const found = decos.find(null, null, specFinder);
  const pos = found.length ? found[0].from : null;
  return pos || null;
}

export function showCursorPlaceholder(state: EditorState): Transform {
  const plugin = singletonInstance;
  let {tr} = state;
  if (!plugin || !tr.selection) {
    return tr;
  }

  const pos = findCursorPlaceholderPos(state);
  if (pos === null) {
    if (!tr.selection.empty) {
      // Replace the selection with a placeholder.
      tr = tr.deleteSelection();
    }
    tr = tr.setMeta(plugin, {
      add: {
        pos: tr.selection.from,
      },
    });
  }

  return tr;
}

export function hideCursorPlaceholder(state: EditorState): Transform {
  const plugin = singletonInstance;
  let {tr} = state;
  if (!plugin) {
    return tr;
  }

  const pos = findCursorPlaceholderPos(state);
  if (pos !== null) {
    tr = tr.setMeta(plugin, {
      remove: {},
    });
  }

  return tr;
}
