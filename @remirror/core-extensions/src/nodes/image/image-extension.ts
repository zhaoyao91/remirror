import {
  Attrs,
  bool,
  Cast,
  CommandFunction,
  CommandNodeTypeParams,
  isElementDOMNode,
  NodeExtension,
  NodeExtensionOptions,
  NodeExtensionSpec,
} from '@remirror/core';
import { ResolvedPos } from 'prosemirror-model';
import { CSS_ROTATE_PATTERN, EMPTY_CSS_VALUE } from '../node-constants';
import { createImageExtensionPlugin } from './image-plugin';

const hasCursor = <T extends {}>(arg: T): arg is T & { $cursor: ResolvedPos } => {
  return bool(Cast(arg).$cursor);
};

export class ImageExtension extends NodeExtension<NodeExtensionOptions> {
  get name() {
    return 'image' as const;
  }

  get schema(): NodeExtensionSpec {
    return {
      inline: true,
      attrs: {
        ...this.extraAttrs(null),
        align: { default: null },
        alt: { default: '' },
        crop: { default: null },
        height: { default: null },
        rotate: { default: null },
        src: { default: null },
        title: { default: '' },
        width: { default: null },
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: domNode => (isElementDOMNode(domNode) ? getAttrs(this.getExtraAttrs(domNode)) : {}),
        },
      ],
      toDOM(node) {
        return ['img', node.attrs];
      },
    };
  }

  public commands({ type }: CommandNodeTypeParams) {
    return {
      insertImage: (attrs?: Attrs): CommandFunction => (state, dispatch) => {
        const { selection } = state;
        const position = hasCursor(selection) ? selection.$cursor.pos : selection.$to.pos;
        const node = type.create(attrs);
        const transaction = state.tr.insert(position, node);

        if (dispatch) {
          dispatch(transaction);
        }

        return true;
      },
    };
  }

  public plugin() {
    return createImageExtensionPlugin();
  }
}

const getAttrs = (extraAttrs: Attrs) => (domNode: HTMLElement) => {
  const { cssFloat, display, marginTop, marginLeft } = domNode.style;
  let { width, height } = domNode.style;
  let align = domNode.getAttribute('data-align') || domNode.getAttribute('align');
  if (align) {
    align = /(left|right|center)/.test(align) ? align : null;
  } else if (cssFloat === 'left' && !display) {
    align = 'left';
  } else if (cssFloat === 'right' && !display) {
    align = 'right';
  } else if (!cssFloat && display === 'block') {
    align = 'block';
  }

  width = width || domNode.getAttribute('width');
  height = height || domNode.getAttribute('height');

  let crop = null;
  let rotate = null;
  const { parentElement } = domNode;
  if (parentElement instanceof HTMLElement) {
    // Special case for Google doc's image.
    const ps = parentElement.style;
    if (
      ps.display === 'inline-block' &&
      ps.overflow === 'hidden' &&
      ps.width &&
      ps.height &&
      marginLeft &&
      !EMPTY_CSS_VALUE.has(marginLeft) &&
      marginTop &&
      !EMPTY_CSS_VALUE.has(marginTop)
    ) {
      crop = {
        width: parseInt(ps.width, 10) || 0,
        height: parseInt(ps.height, 10) || 0,
        left: parseInt(marginLeft, 10) || 0,
        top: parseInt(marginTop, 10) || 0,
      };
    }
    if (ps.transform) {
      // example: `rotate(1.57rad) translateZ(0px)`;
      const mm = ps.transform.match(CSS_ROTATE_PATTERN);
      if (mm && mm[1]) {
        rotate = parseFloat(mm[1]) || null;
      }
    }
  }

  return {
    ...extraAttrs,
    align,
    alt: domNode.getAttribute('alt') || null,
    crop,
    height: parseInt(height || '0', 10) || null,
    rotate,
    src: domNode.getAttribute('src') || null,
    title: domNode.getAttribute('title') || null,
    width: parseInt(width || '0', 10) || null,
  };
};
