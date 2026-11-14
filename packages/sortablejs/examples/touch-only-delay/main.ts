// Two reminder lists with the same delay: one waits for every pointer, one only for touch
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const WAIT = 500;
const TASKS = ['Water plants', 'Call Mum', 'Pay rent', 'Book dentist'];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'lists';
  el.append(wrap);

  const build = (title: string, note: string): { list: HTMLUListElement; note: HTMLElement } => {
    const col = document.createElement('section');
    col.className = 'col';
    col.innerHTML = '<h3></h3><ul class="tasks"></ul><p class="note"></p>';
    col.querySelector('h3')!.textContent = title;
    const list = col.querySelector<HTMLUListElement>('ul')!;
    for (const t of preview ? TASKS.slice(0, 3) : TASKS) {
      const li = document.createElement('li');
      li.className = 'task';
      li.textContent = t;
      list.append(li);
    }
    const noteEl = col.querySelector<HTMLElement>('.note')!;
    noteEl.textContent = note;
    wrap.append(col);
    return { list, note: noteEl };
  };

  // Touch waits for the delay; a mouse picks the row up at once.
  const touchOnly = build('delayOnTouchOnly: true', 'Touch: waits 0.5 s');
  const sortables = [
    Sortable.create(touchOnly.list, { delay: WAIT, delayOnTouchOnly: true, animation: 150, chosenClass: 'held', ghostClass: 'ghost' }),
  ];

  if (!preview) {
    // For comparison: the same delay for everyone, mouse included.
    const always = build('delayOnTouchOnly: false', 'Mouse and touch both wait 0.5 s');
    touchOnly.note.textContent = 'Mouse: instant. Touch: waits 0.5 s';
    sortables.push(Sortable.create(always.list, { delay: WAIT, animation: 150, chosenClass: 'held', ghostClass: 'ghost' }));
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'With a mouse, the left list lifts a row immediately and the right one makes you hold. On a touch screen both make you hold.';
    el.append(hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      // The cards are driven by touch, so the row waits before it lifts.
      await hand.drag(touchOnly.list.lastElementChild!, { el: touchOnly.list.firstElementChild!, fy: 0.2 }, 0.9, { hold: 0.7 });
    });
  }

  return () => release(...sortables);
};

export default mount;
