// renderer.listitem lays out "item - price" lines like a receipt
import { Marked } from 'marked';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { compareDemo } from '../../shared/demo.ts';
import { render } from '../../shared/renderer-kit.ts';
import './style.css';

const BASKET = `- Oat milk - €1.80
- Sourdough loaf - €3.50
- Free-range **eggs** - €2.95
- A reusable bag
- Coffee beans - €7.20`;

const CARD = `- Oat milk - €1.80
- Bread - €3.50
- A bag
- Coffee - €7.20`;

const PRICE = /\s+-\s+(€\d+(?:[.,]\d+)?)\s*$/;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'End a line with " - €1.50" to give it a price' });

  const receipt = new Marked({
    renderer: {
      listitem(item) {
        const html = this.parser.parse(item.tokens).trim();
        const price = PRICE.exec(html);
        // No price on this line: leave it to the built-in list item.
        if (!price) return false;
        const name = html.slice(0, price.index);
        return `<li class="line"><span class="name">${name}</span><span class="dots"></span><span class="price">${price[1]}</span></li>\n`;
      },
    },
  });
  const plain = new Marked();

  compareDemo(stage, {
    samples: [{ text: stage.preview ? CARD : BASKET }],
    sides: [
      { label: 'default', render: (md) => render(plain, md) },
      { label: 'listitem override', render: (md) => render(receipt, md) },
    ],
    caption:
      'Items ending in "- €price" get the name on the left, the price on the right and dots between. The item without a price falls back to a plain bullet.',
  });

  return () => stage.dispose();
};

export default mount;
