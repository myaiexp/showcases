// walkTokens adds 1 to every heading depth, so # becomes ##
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { select } from '../../shared/controls.ts';
import { render } from '../../shared/renderer-kit.ts';

const GUIDE = `# Trip to Tallinn

Ferry leaves at 8.

## Day 1

### Morning
Old town walk.

### Evening
Dinner by the harbour.

## Day 2

Markets and museums.`;

const CARD = `# Trip plan
Ferry at 8.
## Day 1
Old town walk.
### Evening
Harbour dinner.`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Headings sit inside a page that already has its own # title' });
  let shift = 1;

  const shifted = new Marked({
    walkTokens(token) {
      // Tokens are passed by reference, so changing one here changes what the parser renders.
      if (token.type === 'heading') token.depth = Math.min(6, token.depth + shift);
    },
  });
  const plain = new Marked();

  const demo = compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : GUIDE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'walkTokens: depth + 1', render: (md) => render(shifted, md) },
    ],
    caption:
      'The # title shrinks from h1 to h2, ## to h3 and so on (see the HTML), so an article dropped into a page that already has its own h1 keeps the outline in order.',
  });
  if (stage.bar) {
    select(stage.bar, 'Shift by', ['1', '2', '3'], (v) => {
      shift = Number(v);
      demo.refresh();
    });
  }

  return () => stage.dispose();
};

export default mount;
