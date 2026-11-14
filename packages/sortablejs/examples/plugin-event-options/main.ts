// A relay baton list where the drop report includes how long you held each item, added by a plugin
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import Stopwatch from './plugin.ts';
import './style.css';

mountOnce(Stopwatch as unknown as Parameters<typeof mountOnce>[0]);

// The plugin's extra property, which Sortable's own typings do not know about.
type TimedEvent = Sortable.SortableEvent & { heldMs?: number };

const DISHES = ['Ramen', 'Paella', 'Tacos', 'Dumplings', 'Pad thai'];

const mount: Mount = (el, { preview, signal }) => {
  const stage = document.createElement('div');
  stage.className = 'stage';
  const list = document.createElement('ul');
  list.className = 'dishes';
  for (const name of DISHES.slice(0, preview ? 4 : 5)) {
    const li = document.createElement('li');
    li.className = 'dish';
    li.textContent = name;
    list.append(li);
  }
  const report = document.createElement('p');
  report.className = 'report';
  report.textContent = 'Move a dish to see the stopwatch';
  stage.append(list, report);
  el.append(stage);

  const sortable = Sortable.create(list, {
    animation: 150,
    stopwatch: true, // turn the plugin on for this list
    // heldMs was not made by Sortable: the plugin merged it into the event object.
    onEnd(evt: TimedEvent) {
      const secs = ((evt.heldMs ?? 0) / 1000).toFixed(1);
      report.textContent = `${evt.item.textContent} moved ${evt.oldIndex} to ${evt.newIndex}, held for ${secs} s`;
    },
  } as Sortable.Options);

  if (preview) {
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const rows = [...list.children].filter((c) => !c.classList.contains('sortable-fallback'));
      const quick = turn++ % 2 === 0; // a quick move, then a slow one
      await hand.drag(rows[rows.length - 1]!, { el: rows[0]!, fy: 0.2 }, quick ? 0.6 : 1.8);
    }, 0.6);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a dish and take your time, or flick it. The report under the list reads heldMs, a property Sortable does not have: the plugin added it to the event.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
