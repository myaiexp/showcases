// Kanban cards that lift while dragged: onStart/onEnd toggle a class, onTransitionEnd reports "at rest"
import { animate, drag, scopeMotion } from 'motion';
import type { Mount } from '@/types.ts';
import { loopGesture } from '../../shared/pointer.ts';
import { hint } from '../../shared/ui.ts';
import { at } from '../../shared/where.ts';
import './style.css';

const COLUMNS = [
  ['To do', ['Write copy', 'Pick fonts']],
  ['Doing', ['Build page']],
  ['Done', ['Sketch layout']],
] as const;

const mount: Mount = (el, { preview, signal }) => {
  el.innerHTML = `<div class="board${preview ? '' : ' big'}"></div>${preview ? '' : '<p class="status">at rest</p>'}`;
  const board = el.querySelector<HTMLElement>('.board')!;
  const status = el.querySelector<HTMLElement>('.status');
  const cols: HTMLElement[] = [];
  for (const [title, cards] of COLUMNS) {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = '<h4></h4>';
    col.querySelector('h4')!.textContent = title;
    for (const text of cards) {
      const c = document.createElement('div');
      c.className = 'kcard';
      c.textContent = text;
      col.append(c);
    }
    cols.push(col);
    board.append(col);
  }
  if (!preview) hint(el, 'Drag a card: it lifts with a shadow and a tilt. Drop it on another column and it moves over; the status line shows when it is back at rest.');
  const setStatus = (t: string): void => {
    if (status) status.textContent = t;
  };

  const scope = scopeMotion(el, ({ bind }) => {
    // One drag() per card, so each callback closes over its own card.
    for (const card of el.querySelectorAll<HTMLElement>('.kcard')) {
      drag(card, {
        momentum: false,
        snapToOrigin: true,
        onStart: bind(() => {
          card.classList.add('lifted');
          animate(card, { scale: 1.06, rotate: 3 }, { type: 'spring', bounce: 0.4, visualDuration: 0.25 });
          setStatus('dragging');
        }),
        onEnd: bind(() => {
          card.classList.remove('lifted');
          animate(card, { scale: 1, rotate: 0 }, { type: 'spring', bounce: 0.3, visualDuration: 0.3 });
          setStatus('settling');
          const b = card.getBoundingClientRect();
          const cx = b.left + b.width / 2;
          const target = cols.find((c) => {
            const r = c.getBoundingClientRect();
            return cx > r.left && cx < r.right && c !== card.parentElement;
          });
          if (!target) return;
          // Re-parent, then keep the card visually where it was so snapToOrigin glides it into the new slot (snapToOrigin alone does not take over after a re-parent).
          target.append(card);
          const a = card.getBoundingClientRect();
          animate(card, { x: b.left - a.left, y: b.top - a.top }, { duration: 0 });
          animate(card, { x: 0, y: 0 }, { type: 'spring', bounce: 0.25, visualDuration: 0.4 }).then(bind(() => setStatus('at rest')));
        }),
        onTransitionEnd: () => setStatus('at rest'),
      });
    }
  });

  if (preview) {
    let i = 0;
    loopGesture(el, signal, async (g) => {
      const from_ = i % 2 === 0 ? 0 : 1;
      const src = cols[from_]!.querySelector<HTMLElement>('.kcard');
      if (!src) return;
      const dest = cols[from_ + 1]!;
      const a = at(el, src);
      const d = at(el, dest, 0.5, 0.6);
      i++;
      await g.drag(src, a, { x: d.x, y: d.y }, 0.7);
      await g.wait(0.8);
    }, 0.2);
  }

  return () => scope.cancel();
};

export default mount;
