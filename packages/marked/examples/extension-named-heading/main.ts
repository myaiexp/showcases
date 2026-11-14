// renderer: { heading } versus extensions: [{ name: 'heading', renderer }]
import { Marked, type MarkedExtension } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const OUTLINE = `# Weekend plan
## Saturday
## Sunday
### Evening`;

const CARD = `# Weekend plan
## Saturday
## Sunday`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Edit the headings and compare the three setups' });

  // 1. A renderer override: every heading gets an "R" tag.
  const rendererOpts: MarkedExtension = {
    renderer: {
      heading({ tokens, depth }) {
        return `<h${depth}><span class="tag r">renderer</span>${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
    },
  };
  // 2. A custom extension with the same name: only the top heading, false for the rest.
  const extensionOpts: MarkedExtension = {
    extensions: [
      {
        name: 'heading',
        renderer(token) {
          if (token.depth !== 1) return false;
          return `<h1><span class="tag e">extension</span>${this.parser.parseInline(token.tokens ?? [])}</h1>\n`;
        },
      },
    ],
  };

  const onlyRenderer = new Marked(rendererOpts);
  const onlyExtension = new Marked(extensionOpts);
  const both = new Marked(rendererOpts, extensionOpts);

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : OUTLINE }],
    sides: stage.preview
      ? [
          { label: 'renderer only', render: (md) => render(onlyRenderer, md) },
          { label: 'both', render: (md) => render(both, md) },
        ]
      : [
          { label: 'renderer: { heading }', render: (md) => render(onlyRenderer, md) },
          { label: "extensions: [{ name: 'heading' }]", render: (md) => render(onlyExtension, md) },
          { label: 'both together', render: (md) => render(both, md) },
        ],
    caption:
      'A named extension runs before the renderer object whatever the order: it handles the top heading, and its false sends the others on to the renderer (or the built-in one when there is no renderer).',
  });

  return () => stage.dispose();
};

export default mount;
