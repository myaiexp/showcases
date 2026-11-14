// A conference schedule where a slider sets how thick the edge zones are for drop-in-between
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, slider } from '../../shared/controls.ts';
import './style.css';

const TALKS: [string, string][] = [
  ['09:00', 'Opening keynote'],
  ['10:00', 'Faster builds'],
  ['11:00', 'Design systems'],
  ['13:00', 'Lightning talks'],
  ['14:00', 'Panel: the future'],
];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'list';
  for (const [time, title] of TALKS.slice(0, preview ? 4 : 5)) {
    const row = document.createElement('li');
    row.className = 'talk';
    row.innerHTML = '<i class="edge top"></i><i class="edge bottom"></i><b class="time"></b><span class="title"></span>';
    row.querySelector('.time')!.textContent = time;
    row.querySelector('.title')!.textContent = title;
    list.append(row);
  }
  const setEdge = (v: number): void => list.style.setProperty('--edge', String(v));
  setEdge(0.5);

  // invertSwap puts the swap zone on a row's top and bottom edges. invertedSwapThreshold is how
  // much of the row those two edges share (0 to 1): 0.5 means a quarter of the row at each end.
  const sortable = Sortable.create(list, {
    animation: 150,
    invertSwap: true,
    invertedSwapThreshold: 0.5,
    ghostClass: 'ghost',
  });

  if (preview) {
    loopDrive(el, signal, async (hand) => {
      await hand.drag(list.lastElementChild!, { el: list.children[1]!, fy: 0.1 }, 1);
    });
  } else {
    const controls = bar(el);
    slider(controls, 'invertedSwapThreshold', 0.1, 1, 0.05, 0.5, (v) => {
      sortable.option('invertedSwapThreshold', v);
      setEdge(v);
    }, (v) => v.toFixed(2));
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'The shaded strips are the edges where a dragged talk makes room. Thin strips need a precise drop, thick ones react sooner.';
    el.append(hint);
  }
  el.append(list);

  return () => release(sortable);
};

export default mount;
