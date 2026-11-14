// Small named extension packs for the use() and constructor examples
import type { MarkedExtension } from 'marked';

export interface Pack {
  id: string;
  /** Button/checkbox label. */
  label: string;
  /** What the pack does, in the code view. */
  code: string;
  ext: MarkedExtension;
}

/** Three packs that change visibly different things, so each one's effect is easy to spot. */
export const PACKS: Record<'chat' | 'marker' | 'arrows', Pack> = {
  chat: {
    id: 'chat',
    label: 'chat',
    code: '{ breaks: true }',
    ext: { breaks: true },
  },
  marker: {
    id: 'marker',
    label: 'marker',
    code: '{ renderer: { strong: <mark> } }',
    ext: {
      renderer: {
        strong({ tokens }) {
          return `<mark>${this.parser.parseInline(tokens)}</mark>`;
        },
      },
    },
  },
  arrows: {
    id: 'arrows',
    label: 'arrows',
    code: '{ renderer: { link: adds ↗ } }',
    ext: {
      renderer: {
        link({ href, tokens }) {
          return `<a href="${href}">${this.parser.parseInline(tokens)} ↗</a>`;
        },
      },
    },
  },
};

export const PACK_SAMPLE = `Pick up:
**Milk** and eggs
Bread from [the bakery](#shop)`;
