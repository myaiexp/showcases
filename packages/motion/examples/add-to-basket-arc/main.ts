// A shop: "Add to basket" flies the product thumbnail along an arc() into the cart icon, which bumps
import { animate, arc, delay, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { hint, panel } from '../../shared/ui.ts';
import './style.css';

const mount: Mount = (el, { preview }) => {
  el.innerHTML = `
    <div class="shop${preview ? '' : ' full'}">
      <div class="top"><b>Corner Shop</b>
        <div class="cart" aria-label="Basket"><svg viewBox="0 0 24 24"><path d="M3 4h3l2.4 11h10.2L21 7H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17.5" cy="19.5" r="1.4"/></svg><i>0</i></div>
      </div>
      <div class="product"><div class="thumb"></div><div><div class="name">Ceramic mug</div><div class="price">$14</div></div></div>
      <button class="add btn">Add to basket</button>
    </div>`;
  const shop = el.querySelector<HTMLElement>('.shop')!;
  const thumb = el.querySelector<HTMLElement>('.thumb')!;
  const cart = el.querySelector<HTMLElement>('.cart')!;
  const badge = el.querySelector<HTMLElement>('.cart i')!;
  const addButton = el.querySelector<HTMLButtonElement>('.add')!;
  let strength = 0.8;
  let count = 0;
  let p: ReturnType<typeof panel> | undefined;

  const scope = scopeMotion(el, (s) => {
    const add = s.bind((): void => {
      const box = shop.getBoundingClientRect();
      const from = thumb.getBoundingClientRect();
      const to = cart.getBoundingClientRect();
      // A copy of the thumbnail sits on top of the real one, ready to fly.
      const ghost = document.createElement('div');
      ghost.className = 'ghost';
      Object.assign(ghost.style, { left: `${from.left - box.left}px`, top: `${from.top - box.top}px`, width: `${from.width}px`, height: `${from.height}px` });
      shop.append(ghost);
      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);
      // Without `path` x and y would travel in a straight line. arc() bends it.
      animate(ghost, { x: [0, dx], y: [0, dy], scale: [1, 0.3] }, { duration: 0.7, ease: 'easeIn', path: arc({ strength, rotate: 0.3 }) }).then(
        s.bind(() => {
          ghost.remove();
          badge.textContent = String(++count);
          animate(cart, { scale: [1, 1.3, 1] }, { duration: 0.35 });
          animate(badge, { scale: [0.4, 1] }, { type: 'spring', bounce: 0.6, visualDuration: 0.35 });
        }),
      );
    });

    if (preview) {
      const tick = (): void => {
        add();
        delay(tick, 2.2);
      };
      delay(tick, 0.6);
    } else {
      addButton.addEventListener('click', add);
      hint(el, 'Press Add to basket as often as you like. Raise the strength and the thumbnail swings out in a bigger curve before it lands in the basket.');
      p = panel(el);
      p.slider('arc strength', { min: 0, max: 1.5, step: 0.1, value: strength }, (v) => { strength = v; });
    }
    return () => addButton.removeEventListener('click', add);
  });
  return () => { scope.cancel(); p?.dispose(); };
};

export default mount;
