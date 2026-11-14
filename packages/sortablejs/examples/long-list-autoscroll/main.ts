// A 30-book reading list in a short box that scrolls itself while you drag near its edge
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox, readout } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TITLES = ['Dune', 'Emma', 'Ulysses', 'Beloved', 'Kindred', 'Middlemarch', 'Persuasion', 'Hyperion', 'Solaris', 'Rebecca'];
const book = (i: number): string => `${TITLES[i % TITLES.length]} ${i < TITLES.length ? '' : `vol. ${Math.floor(i / TITLES.length) + 1}`}`.trim();

const mount: Mount = (el, { preview, signal }) => {
  const box = document.createElement('div');
  box.className = 'shelf'; // the scrolling box: a fixed height with overflow: auto
  const list = document.createElement('ol');
  list.className = 'books';
  for (let i = 0; i < 30; i++) {
    const li = document.createElement('li');
    li.className = 'book';
    li.style.setProperty('--spine', `hsl(${(i * 47) % 360} 55% 55%)`);
    li.textContent = book(i);
    list.append(li);
  }
  box.append(list);
  if (!preview) box.style.height = '300px';
  el.append(box);

  const sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'gap',
    scroll: box, // the element that scrolls while you drag near its top or bottom edge
    // A scripted (touch) drag only reaches the autoscroll in fallback mode, so cards create the list with forceFallback.
    forceFallback: preview,
    forceAutoScrollFallback: true, // use Sortable's own scrolling on every browser, not only where the browser lacks it
  });

  if (preview) {
    // Grab the top book, hold it at the bottom edge until the shelf has scrolled, drop it there. Then bring one back up.
    let down = true;
    loopDrive(el, signal, async (hand) => {
      const at = el.getBoundingClientRect();
      const books = [...list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      const rows = books.filter((b) => {
        const r = b.getBoundingClientRect();
        return r.top >= box.getBoundingClientRect().top && r.bottom <= box.getBoundingClientRect().bottom;
      });
      const item = down ? rows[0]! : rows[rows.length - 1]!;
      const r = item.getBoundingClientRect();
      hand.down(item);
      await hand.glide({ x: r.left - at.left + 40, y: r.top - at.top + r.height / 2 + 4 }, 0.08);
      await hand.glide({ el: box, fx: 0.5, fy: down ? 0.93 : 0.07 }, 0.8);
      await hand.wait(1.6); // still pressed, inside the edge zone: the box keeps scrolling
      await hand.glide({ el: box, fx: 0.5, fy: down ? 0.7 : 0.3 }, 0.4);
      hand.up();
      down = !down;
    }, 0.6, { autoScroll: true });
  } else {
    const bar = document.createElement('div');
    bar.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px 18px;justify-content:center;padding:10px 0 4px';
    checkbox(bar, 'Auto-scroll at the edges', true, (on) => sortable.option('scroll', on ? box : false));
    const state = readout(bar);
    const show = (): void => {
      state.textContent = `scrolled ${Math.round(box.scrollTop)} px`;
    };
    box.addEventListener('scroll', show);
    show();
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a book toward the top or bottom edge of the shelf and hold it there: the shelf scrolls by itself so you can reach the far end. Untick the box to see how hard that is without it.';
    el.append(bar, hint);
  }

  return () => release(sortable);
};

export default mount;
