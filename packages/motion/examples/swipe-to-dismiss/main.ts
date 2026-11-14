// Notifications you flick sideways to dismiss: drag() on one axis with a release test
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import './style.css';

const MESSAGES = [
  ['Mia', 'Running 5 min late, save me a seat'],
  ['Calendar', 'Design review in 15 minutes'],
  ['Bank', 'Card payment of 12.40 € approved'],
  ['Weather', 'Rain starts around 17:00'],
  ['Ville', 'Sent you the photos from Saturday'],
] as const;

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('div');
  list.className = 'list';
  el.append(list);
  if (!preview) hint(el, 'Drag a notification sideways. Past 90px, or flicked fast, it flies off and the rest close the gap; otherwise it springs back.');

  let next = 0;
  const scope = scopeMotion(el, ({ bind }) => {
    const add = (): HTMLElement => {
      const [from, text] = MESSAGES[next++ % MESSAGES.length]!;
      const card = document.createElement('div');
      card.className = 'note';
      card.innerHTML = '<b></b><span></span>';
      card.querySelector('b')!.textContent = from;
      card.querySelector('span')!.textContent = text;
      list.append(card);
      animate(card, { opacity: [0, 1], y: [12, 0] }, { duration: 0.3 });

      // axis locks the gesture to x; touch input can still scroll the page vertically.
      drag(card, {
        axis: 'x',
        onEnd: bind((_e, info) => {
          const flung = Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 600;
          if (!flung) {
            animate(card, { x: 0 }, { type: 'spring', bounce: 0.35, visualDuration: 0.3 });
            return;
          }
          const dir = Math.sign(info.offset.x || info.velocity.x);
          // Fly off, then collapse the gap so the cards below slide up.
          animate(card, { x: dir * 400, opacity: 0 }, { duration: 0.25 }).then(
            bind(async () => {
              await animate(card, { height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }, { duration: 0.2 });
              card.remove();
              add();
            }),
          );
        }),
      });
      return card;
    };
    for (let i = 0; i < 3; i++) add();
  });

  // A card has no pointer: script a swipe on the top notification, over and over.
  if (preview) {
    loopGesture(el, signal, async (p) => {
      const top = list.querySelector<HTMLElement>('.note');
      if (!top) return;
      const r = top.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      const y = r.top - box.top + r.height / 2;
      const x = r.left - box.left + r.width * 0.4;
      await p.drag(top, { x, y }, { x: x + 160, y }, 0.45);
      await p.wait(0.6);
    }, 0.6);
  }

  return () => scope.cancel();
};

export default mount;
