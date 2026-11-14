// Two price tags with the same tip string: one parsed as HTML, one shown as text
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// A constant string: allowHTML must never be given text a visitor typed.
const TIP = '<b>$24.00</b> · <span class="ok">in stock</span>';

function product(parent: HTMLElement, caption: string): HTMLButtonElement {
  const card = document.createElement('div');
  card.className = 'product';
  const shoe = document.createElement('div');
  shoe.className = 'shoe';
  shoe.textContent = '👟';
  const price = document.createElement('button');
  price.className = 'btn';
  price.textContent = 'Trail shoes';
  const cap = document.createElement('div');
  cap.className = 'caption';
  cap.textContent = caption;
  card.append(shoe, price, cap);
  parent.append(card);
  return price;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 260, hint: 'Hover each product name.' });
  const row = document.createElement('div');
  row.className = 'products';
  stage.root.append(row);
  const left = product(row, 'allowHTML: true');
  const right = product(row, 'allowHTML: false (the default)');

  stage.own(tippy(left, { content: TIP, allowHTML: true, appendTo: stage.root }));
  stage.own(tippy(right, { content: TIP, allowHTML: false, appendTo: stage.root }));

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const b of [left, right]) {
        await stage.ghost.hover(b, 600);
        await wait(1500);
      }
      stage.ghost.leave();
      await wait(400);
    });
  }

  return stage.dispose;
};

export default mount;
