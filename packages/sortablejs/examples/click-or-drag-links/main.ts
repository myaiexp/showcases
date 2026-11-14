// A bookmarks bar where a click opens a site and a real drag reorders, with a slider for the dead zone
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import { bar, readout, slider } from '../../shared/controls.ts';
import './style.css';

const SITES = ['Weather', 'Maps', 'Recipes', 'Podcasts', 'Timetable'];

const mount: Mount = (el, { preview, signal }) => {
  const status = readout(el, 'Click a bookmark, or drag one.');
  const list = document.createElement('ul');
  list.className = 'list';
  for (const site of SITES.slice(0, preview ? 4 : 5)) {
    const item = document.createElement('li');
    item.className = 'mark';
    item.innerHTML = '<a href="#"></a>';
    item.firstElementChild!.textContent = site;
    list.append(item);
  }
  el.append(list);

  let opened = 0;
  list.addEventListener('click', (e) => {
    const link = (e.target as Element).closest('a');
    if (!link) return;
    e.preventDefault(); // a demo: stay on this page
    status.textContent = `Opened ${link.textContent} (${++opened} clicks so far)`;
  });

  // fallbackTolerance: the pointer has to travel this many pixels before a press counts as a drag.
  // Shorter than that and the press is still a click, so the link opens. It belongs to fallback
  // mode, hence forceFallback. After a real drag, Sortable swallows the click that follows.
  const sortable = Sortable.create(list, {
    animation: 150,
    forceFallback: true,
    fallbackTolerance: 6,
    ghostClass: 'hole',
    onEnd: (evt) => {
      if (evt.oldIndex !== evt.newIndex) status.textContent = `Moved ${evt.item.textContent} to place ${evt.newIndex! + 1}`;
    },
  });

  if (preview) {
    // Tap a bookmark (it opens), then drag another to the front (it reorders).
    loopDrive(el, signal, async (hand) => {
      const first = list.firstElementChild!;
      await hand.tap(first);
      first.querySelector('a')!.click(); // a tap on a card is only pointer events, so send the click ourselves
      await hand.wait(0.5);
      await hand.drag(list.lastElementChild!, { el: first, fy: 0.3 }, 1);
    }, 0.4);
  } else {
    const controls = bar(el);
    el.prepend(controls);
    slider(controls, 'fallbackTolerance', 0, 30, 1, 6, (v) => sortable.option('fallbackTolerance', v), (v) => `${v} px`);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'At 0 px the slightest wobble while clicking starts a drag. Around 5 px, clicks open and drags reorder.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
