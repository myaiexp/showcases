// A pay button: press start, then success or cancel depending on where you let go
import { animate, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `
    <div class="pay${preview ? '' : ' big'}">
      <button class="btn-pay" type="button">Pay 24.00 EUR</button>
      <p class="result">Press the button</p>
      <ol class="log"></ol>
    </div>`;
  const btn = el.querySelector<HTMLElement>('.btn-pay')!;
  const result = el.querySelector<HTMLElement>('.result')!;
  const log = el.querySelector<HTMLElement>('.log')!;
  if (!preview) hint(el, 'Click and release on the button to pay. Press, drag off the button, then let go: the press cancels (info.success is false) and nothing is charged.');

  const note = (text: string): void => {
    const li = document.createElement('li');
    li.textContent = text;
    log.prepend(li);
    while (log.children.length > 3) log.lastElementChild?.remove();
  };

  const scope = scopeMotion(el, () => {
    press(btn, () => {
      animate(btn, { scale: 0.94 }, { duration: 0.12 });
      result.textContent = 'Holding...';
      note('press start');
      return (_e, info) => {
        animate(btn, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
        result.textContent = info.success ? 'Paid. Thank you!' : 'Cancelled, nothing charged';
        result.dataset.ok = String(info.success);
        note(`press end, success: ${info.success}`);
      };
    });
  });

  if (preview) {
    let ok = false;
    loopGesture(el, signal, async (g) => {
      const a = at(el, btn);
      ok = !ok;
      if (ok) {
        await g.tap(btn, a, 0.25);
      } else {
        // Release outside the button: the pointer-up lands on the window, not the element.
        g.down(btn, a);
        await g.wait(0.2);
        await g.glide(a, { x: a.x + 20, y: a.y + 70 }, 0.3);
        g.up({ x: a.x + 20, y: a.y + 70 });
      }
      await g.wait(1.2);
    }, 0.2);
  }

  return () => scope.cancel();
};

export default mount;
