// A bus route where moved stops are reported with their old and new positions
import Sortable, { MultiDrag } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const STOPS = ['Harbour', 'Old Town', 'Library', 'Stadium', 'Airport', 'Museum', 'Park'];

mountOnce(new MultiDrag());

// MultiDrag keeps ONE selection for the whole page. A selection left behind by a card would be
// dragged into the next list that multi-drags, so cards always unpick everything when they finish.
const utils = Sortable.utils as typeof Sortable.utils & { deselect(el: HTMLElement): void };
const untick = (...lists: HTMLElement[]): void => {
  for (const list of lists) for (const row of list.children) utils.deselect(row as HTMLElement);
};

// What a multi-drag event carries on top of the usual ones.
type Index = { multiDragElement: HTMLElement; index: number };
interface MultiEvent extends Sortable.SortableEvent {
  items: HTMLElement[];
  oldIndicies: Index[];
  newIndicies: Index[];
}

const mount: Mount = (el, { preview, signal }) => {
  const layout = document.createElement('div');
  layout.className = 'layout';
  const list = document.createElement('ol');
  list.className = 'route';
  for (const name of STOPS.slice(0, preview ? 5 : 7)) {
    const stop = document.createElement('li');
    stop.className = 'stop';
    stop.textContent = name;
    list.append(stop);
  }
  const report = document.createElement('pre');
  report.className = 'report';
  report.textContent = 'Move some stops\nto see the report';
  layout.append(list, report);
  el.append(layout);

  const sortable = Sortable.create(list, {
    multiDrag: true,
    selectedClass: 'ticked',
    animation: 150,
    onEnd(evt) {
      const e = evt as MultiEvent;
      if (!e.items.length) return; // an ordinary single drag has no multi-drag properties
      const lines = [`items: ${e.items.length} stops`];
      e.oldIndicies.forEach((old, i) => {
        // Pairs line up: oldIndicies[i] and newIndicies[i] describe the same stop.
        // The dragged stop gets its real new index; the others read -1 (they are still folding in).
        const now = e.newIndicies[i]!.index;
        lines.push(`${old.multiDragElement.textContent}: ${old.index} -> ${now}`);
      });
      report.textContent = lines.join('\n');
    },
  });

  if (preview) {
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const stops = [...list.children];
      const a = stops[turn % 2]!;
      const b = stops[2 + (turn % 2)]!;
      await hand.tap(a);
      await hand.wait(0.25);
      await hand.tap(b);
      await hand.wait(0.4);
      await hand.drag(b, { el: stops[4]!, fy: 0.8 }, 1.1);
      await hand.wait(1.6);
      untick(list);
      turn++;
    }, 0.3);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Tick a few stops, drag them somewhere else, and read the report: where each stop started and where it ended up.';
    el.append(hint);
  }

  return () => {
    untick(list);
    release(sortable);
  };
};

export default mount;
