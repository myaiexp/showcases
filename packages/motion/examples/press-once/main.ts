// Claim-your-reward cards: press() with once: true fires a single time per element
import { animate, press, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint, panel } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const REWARDS = ['10% off', 'Free shipping', 'Bonus gift'];

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="rewards${preview ? '' : ' big'}"></div><p class="tally">Claim a reward</p>`;
  const wrap = el.querySelector<HTMLElement>('.rewards')!;
  const tally = el.querySelector<HTMLElement>('.tally')!;
  const cards = REWARDS.map((r) => {
    const c = document.createElement('button');
    c.type = 'button';
    c.className = 'reward';
    c.innerHTML = '<b></b><span>Claim</span>';
    c.querySelector('b')!.textContent = r;
    wrap.append(c);
    return c;
  });
  let claimed = 0;
  let stop: VoidFunction = () => undefined;
  const scope = scopeMotion(el, () => undefined);

  const arm = (): void => {
    stop();
    claimed = 0;
    tally.textContent = 'Claim a reward';
    for (const c of cards) {
      c.dataset.done = 'false';
      c.querySelector('span')!.textContent = 'Claim';
    }
    // once: true means each card's press gesture fires one time, then its listeners are gone.
    stop = press(
      cards,
      (card) => {
        animate(card, { scale: 0.95 }, { duration: 0.1 });
        return (_e, info) => {
          animate(card, { scale: 1 }, { type: 'spring', bounce: 0.5, visualDuration: 0.3 });
          if (!info.success) return;
          (card as HTMLElement).dataset.done = 'true';
          card.querySelector('span')!.textContent = 'Claimed';
          tally.textContent = `${++claimed} of ${cards.length} claimed${preview ? "" : ". Pressing again does nothing."}`;
          animate(card, { rotate: [0, -4, 4, 0] }, { duration: 0.35 });
        };
      },
      { once: true },
    );
  };
  scope.run(arm);

  let p: ReturnType<typeof panel> | undefined;
  if (!preview) {
    hint(el, 'Press a reward to claim it. Each card responds once; press it again and nothing happens. Reset re-attaches the gestures.');
    p = panel(el);
    p.button('Reset', () => scope.run(arm));
  } else {
    let i = 0;
    loopGesture(el, signal, async (g) => {
      const c = cards[i % cards.length]!;
      if (i % 4 === 3) scope.run(arm);
      else await g.tap(c, at(el, c), 0.1);
      i++;
      await g.wait(0.6);
    }, 0.2);
  }

  return () => {
    stop();
    p?.dispose();
    scope.cancel();
  };
};

export default mount;
