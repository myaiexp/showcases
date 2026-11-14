// A hiring pipeline where candidates only move forward, never back to Applied
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const STAGES = [
  { id: 'applied', title: 'Applied', color: 'var(--blue)', people: ['Ana', 'Ben', 'Chloe'] },
  { id: 'interview', title: 'Interview', color: 'var(--orange)', people: ['Dev'] },
  { id: 'hired', title: 'Hired', color: 'var(--green)', people: [] as string[] },
];
const NEWCOMERS = ['Elif', 'Femi', 'Gus', 'Hana', 'Ivo', 'Jun'];

// Each stage is its own group. `pull` lists the groups a card may leave to, `put` the groups
// it may arrive from. A move needs both sides to agree.
const GROUPS = {
  applied: { name: 'applied', pull: ['interview'], put: false },
  interview: { name: 'interview', pull: ['hired'], put: ['applied'] },
  hired: { name: 'hired', pull: false, put: ['interview'] },
};

const mount: Mount = (el, { preview, signal }) => {
  const board = document.createElement('div');
  board.className = 'board';
  const lists = new Map<string, HTMLUListElement>();
  const person = (name: string): HTMLLIElement => {
    const li = document.createElement('li');
    li.className = 'person';
    li.textContent = name;
    return li;
  };
  for (const s of STAGES) {
    const col = document.createElement('section');
    col.className = 'column';
    col.style.setProperty('--col', s.color);
    col.innerHTML = '<h3></h3><ul class="people"></ul>';
    col.querySelector('h3')!.textContent = s.title;
    const list = col.querySelector<HTMLUListElement>('ul')!;
    list.append(...s.people.map(person));
    lists.set(s.id, list);
    board.append(col);
  }
  el.append(board);

  const sortables = STAGES.map((s) =>
    Sortable.create(lists.get(s.id)!, {
      group: GROUPS[s.id as keyof typeof GROUPS],
      animation: 150,
      ghostClass: 'ghost',
      // While a card is lifted, light up only the columns that would take it.
      onStart(evt) {
        const from = Sortable.get(evt.from)!;
        const rules = (s: Sortable): Sortable.GroupOptions => s.options.group as Sortable.GroupOptions;
        for (const other of sortables) {
          const ok = other === from || (rules(from).checkPull!(other, from, evt.item, evt) && rules(other).checkPut!(other, from, evt.item, evt));
          other.el.parentElement!.classList.toggle('closed', !ok);
        }
      },
      onEnd() {
        for (const l of lists.values()) l.parentElement!.classList.remove('closed');
      },
    }),
  );

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Lift a card: columns that would refuse it dim. Try dragging a hire back to Interview, or Applied straight to Hired.';
    el.append(hint);
  } else {
    let next = 0;
    const applied = lists.get('applied')!;
    const interview = lists.get('interview')!;
    const hired = lists.get('hired')!;
    loopDrive(el, signal, async (hand) => {
      if (hired.children.length > 1) hired.firstElementChild!.remove();
      while (applied.children.length < 3) applied.append(person(NEWCOMERS[next++ % NEWCOMERS.length]!));
      if (interview.children.length >= 2) {
        await hand.drag(interview.firstElementChild!, hired, 1);
      } else {
        await hand.drag(applied.firstElementChild!, interview, 1);
      }
    }, 0.5);
  }

  return () => release(...sortables);
};

export default mount;
