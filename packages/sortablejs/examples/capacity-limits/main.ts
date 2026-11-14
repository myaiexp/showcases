// Team squads that hold three players at most: a put() function refuses the fourth
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const MAX = 3;
const PLAYERS = ['Mika', 'Noor', 'Omar', 'Pia', 'Quinn', 'Rafa', 'Sana', 'Tomas'];

const mount: Mount = (el, { preview, signal }) => {
  const squadNames = preview ? ['Reds', 'Blues'] : ['Reds', 'Blues', 'Greens'];
  const wrap = document.createElement('div');
  wrap.className = 'league';
  wrap.innerHTML = '<section class="bench"><h3>Bench</h3><ul class="players"></ul></section><div class="squads"></div>';
  const bench = wrap.querySelector<HTMLUListElement>('.players')!;
  const squads = wrap.querySelector<HTMLDivElement>('.squads')!;
  const player = (name: string): HTMLLIElement => {
    const li = document.createElement('li');
    li.className = 'player';
    li.textContent = name;
    return li;
  };
  const lists = squadNames.map((name) => {
    const col = document.createElement('section');
    col.className = 'squad';
    col.innerHTML = '<h3><span class="name"></span><span class="count"></span></h3><ul class="players"></ul>';
    col.querySelector('.name')!.textContent = name;
    squads.append(col);
    return col.querySelector<HTMLUListElement>('ul')!;
  });
  // Start with the first squad full, so the refusal is easy to see.
  lists[0]!.append(...PLAYERS.slice(0, 3).map(player));
  lists[1]!.append(player(PLAYERS[3]!));
  bench.append(...PLAYERS.slice(4, preview ? 7 : 8).map(player));
  el.append(wrap);

  const refresh = (): void => {
    for (const list of lists) {
      const n = list.children.length;
      list.parentElement!.classList.toggle('full', n >= MAX);
      list.parentElement!.querySelector('.count')!.textContent = n >= MAX ? 'FULL' : `${n}/${MAX}`;
    }
  };
  refresh();

  const common = { animation: 150, ghostClass: 'ghost', onSort: refresh };
  const sortables = [
    // The bench takes anyone back.
    Sortable.create(bench, { ...common, group: { name: 'team', pull: true, put: true } }),
    ...lists.map((list) =>
      Sortable.create(list, {
        ...common,
        // put() runs while a player hovers a squad: returning false shows the squad as closed.
        // Sortable passes the list being asked first, so its own children are the current squad.
        group: { name: 'team', pull: true, put: (to) => to.el.children.length < MAX },
      }),
    ),
  ];

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Each squad holds three. Free a place by sending someone to the bench, then the next player fits.';
    el.append(hint);
  } else {
    const [reds, blues] = lists as [HTMLUListElement, HTMLUListElement];
    loopDrive(el, signal, async (hand) => {
      if (blues.children.length < MAX) {
        // The Reds are full: the player bounces back to the bench.
        await hand.drag(bench.firstElementChild!, reds, 0.9);
        await hand.drag(bench.firstElementChild!, blues, 0.9);
      } else {
        await hand.drag(blues.firstElementChild!, bench, 0.9);
      }
    }, 0.5);
  }

  return () => release(...sortables);
};

export default mount;
