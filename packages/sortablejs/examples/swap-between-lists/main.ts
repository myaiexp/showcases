// Two teams that trade players one-for-one by dropping a player on a player
import Sortable, { Swap } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const TEAMS = [
  { name: 'Reds', color: 'var(--red)', players: [['Vik', 9], ['Noor', 6], ['Cass', 4]] },
  { name: 'Blues', color: 'var(--blue)', players: [['Jo', 7], ['Mina', 8], ['Pablo', 3]] },
] as const;

mountOnce(new Swap());

const mount: Mount = (el, { preview, signal }) => {
  const board = document.createElement('div');
  board.className = 'teams';
  const lists = TEAMS.map((team) => {
    const col = document.createElement('section');
    col.className = 'team';
    col.style.setProperty('--jersey', team.color);
    col.innerHTML = '<header><h3></h3><span class="power"></span></header><ul class="players"></ul>';
    col.querySelector('h3')!.textContent = team.name;
    const ul = col.querySelector('ul')!;
    for (const [name, power] of team.players) {
      const li = document.createElement('li');
      li.className = 'player';
      li.dataset['power'] = String(power);
      li.innerHTML = '<span></span><b></b>';
      li.querySelector('span')!.textContent = name;
      li.querySelector('b')!.textContent = String(power);
      ul.append(li);
    }
    board.append(col);
    return ul;
  });
  el.append(board);

  const totals = (): void => {
    for (const ul of lists) {
      const sum = [...ul.children].reduce((n, li) => n + Number((li as HTMLElement).dataset['power']), 0);
      ul.parentElement!.querySelector('.power')!.textContent = `power ${sum}`;
    }
  };
  totals();

  // The same group lets players cross; swap: true on both lists makes a drop a one-for-one trade
  // (each team keeps three players) instead of an insert.
  const sortables = lists.map((ul) =>
    Sortable.create(ul, {
      group: 'league',
      swap: true,
      swapClass: 'trade-with',
      animation: 200,
      onSort: totals,
    }),
  );

  if (preview) {
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const [from, to] = turn++ % 2 ? [lists[1]!, lists[0]!] : [lists[0]!, lists[1]!];
      const players = (l: HTMLElement) => [...l.children].filter((c) => !c.classList.contains('sortable-fallback'));
      await hand.drag(players(from)[turn % 3]!, players(to)[(turn + 1) % 3]!, 1.1);
    }, 0.8);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a player onto a player of the other team: they change teams. The power totals show whether the trade was fair.';
    el.append(hint);
  }

  return () => release(...sortables);
};

export default mount;
