// A dashboard of full-width and half-width widgets that pair up side by side
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const WIDGETS: [string, 'full' | 'half', string][] = [
  ['Revenue this week', 'full', 'var(--green)'],
  ['Visitors', 'half', 'var(--blue)'],
  ['Sign-ups', 'half', 'var(--accent)'],
  ['Regions', 'full', 'var(--orange)'],
  ['Errors', 'half', 'var(--red)'],
  ['Latency', 'half', 'var(--blue)'],
];

const mount: Mount = (el, { preview, signal }) => {
  const board = document.createElement('div');
  board.className = 'board';
  for (const [title, size, color] of preview ? WIDGETS.filter((w) => w[0] !== 'Regions') : WIDGETS) {
    const widget = document.createElement('div');
    widget.className = `widget ${size === 'half' ? 'half-column' : 'full-column'}`;
    widget.style.setProperty('--tone', color);
    widget.innerHTML = '<span class="title"></span><i class="bar"></i>';
    widget.querySelector('.title')!.textContent = title;
    board.append(widget);
  }
  el.append(board);
  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a half-width widget next to another one to pair them up. Over a full-width widget the board sorts top to bottom instead.';
    el.append(hint);
  }

  // The board mixes rows of one wide widget with rows of two narrow ones. A direction function is asked
  // on every drag-over: side by side when both the target and the dragged widget are half-width.
  const sortable = Sortable.create(board, {
    animation: 150,
    ghostClass: 'ghost',
    direction(_evt, target, dragEl) {
      if (target !== null && target.className.includes('half-column') && dragEl.className.includes('half-column')) {
        return 'horizontal';
      }
      return 'vertical';
    },
  });

  if (preview) {
    // Slide the last widget in front of the first half-width one, so the pairs keep changing.
    loopDrive(el, signal, async (hand) => {
      await hand.drag(board.lastElementChild!, { el: board.children[1]!, fx: 0.25 }, 1.1);
    });
  }

  return () => release(sortable);
};

export default mount;
