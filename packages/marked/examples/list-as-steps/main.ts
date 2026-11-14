// renderer.list turns a numbered list into a row of step cards
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const RECIPE = `Pancakes for four:

1. Whisk two eggs with 300 ml of milk.
2. Stir in 200 g of flour and a pinch of salt.
3. Rest the batter for ten minutes.
4. Fry in a hot, buttered pan.

Shopping list:

- Eggs
- Milk
- Flour`;

const CARD = `1. Whisk eggs
2. Add flour
3. Rest ten min

- Eggs
- Milk`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or reorder the numbered steps' });

  const steps = new Marked({
    renderer: {
      list(token) {
        // Only numbered lists become steps; bullet lists take the built-in output.
        if (!token.ordered) return false;
        const start = Number(token.start) || 1;
        const cards = token.items
          .map((item, i) => `<li class="step"><span class="step-n">${start + i}</span><div>${this.parser.parse(item.tokens)}</div></li>`)
          .join('');
        return `<ol class="steps">${cards}</ol>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : RECIPE }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'list override', render: (md) => render(steps, md) },
    ],
    caption:
      'The numbered recipe becomes a stack of step cards with big numbers; the bullet list underneath is untouched because the override returns false for it.',
  });

  return () => stage.dispose();
};

export default mount;
