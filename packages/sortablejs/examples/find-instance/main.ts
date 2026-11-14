// Shift rosters controlled from outside: Sortable.get(element) finds each list's instance
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const SHIFTS = [
  { name: 'Early', staff: ['Ana', 'Ben', 'Cy'] },
  { name: 'Late', staff: ['Dee', 'Eli'] },
  { name: 'Night', staff: ['Fay', 'Gus'] },
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'rota compact' : 'rota';
  el.append(wrap);
  const lists: HTMLUListElement[] = [];
  const sortables = SHIFTS.map((s) => {
    const box = document.createElement('section');
    box.innerHTML = '<h3><span></span><button type="button" class="lock">Lock</button></h3><ul class="staff"></ul>';
    box.querySelector('span')!.textContent = s.name;
    const ul = box.querySelector('ul')!;
    for (const person of s.staff) {
      const li = document.createElement('li');
      li.className = 'person';
      li.textContent = person;
      ul.append(li);
    }
    ul.dataset['lane'] = s.name;
    box.querySelector<HTMLButtonElement>('.lock')!.addEventListener('click', () => lock(ul, !Sortable.get(ul)!.option('disabled')));
    wrap.append(box);
    lists.push(ul);
    return Sortable.create(ul, { group: 'rota', animation: 150, ghostClass: 'ghost' });
  });

  // Everything below works from an element alone: no instance variable is kept.
  function lock(ul: HTMLElement, locked: boolean): void {
    const sortable = Sortable.get(ul)!; // find the Sortable that owns this list
    sortable.option('disabled', locked); // nobody can be dragged out...
    sortable.option('group', { name: 'rota', pull: !locked, put: !locked }); // ...or dropped in
    ul.parentElement!.classList.toggle('locked', locked);
    ul.parentElement!.querySelector('.lock')!.textContent = locked ? 'Unlock' : 'Lock';
  }
  const speed = (ms: number): void => {
    for (const ul of wrap.querySelectorAll<HTMLElement>('[data-lane]')) Sortable.get(ul)?.option('animation', ms);
  };

  if (!preview) {
    const row = document.createElement('label');
    row.className = 'speed';
    const input = document.createElement('input');
    Object.assign(input, { type: 'range', min: '0', max: '600', step: '50', value: '150' });
    const text = document.createElement('span');
    text.textContent = 'Slide speed (all rosters): 150 ms';
    input.addEventListener('input', () => {
      speed(Number(input.value));
      text.textContent = `Slide speed (all rosters): ${input.value} ms`;
    });
    row.append(text, input);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Lock the Late roster, then try to drag someone into it or out of it.';
    el.append(row, hint);
  } else {
    // Lock the middle roster: a person dragged toward it springs back. Unlock and it takes them.
    loopDrive(el, signal, async (hand) => {
      lock(lists[1]!, true);
      await hand.wait(0.3);
      await hand.drag(lists[0]!.firstElementChild!, { el: lists[1]!, fy: 0.5 }, 0.8);
      await hand.wait(0.3);
      lock(lists[1]!, false);
      await hand.wait(0.3);
      await hand.drag(lists[0]!.firstElementChild!, { el: lists[1]!, fy: 0.5 }, 0.8);
      await hand.wait(0.3);
      await hand.drag(lists[1]!.lastElementChild!, { el: lists[0]!, fy: 0.5 }, 0.8);
    }, 0.4);
  }

  return () => release(...sortables);
};

export default mount;
