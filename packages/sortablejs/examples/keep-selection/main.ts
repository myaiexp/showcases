// Two guest lists side by side: one loses its selection when you click a button, one keeps it
import Sortable, { MultiDrag } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const GUESTS = ['Ana', 'Ben', 'Chloe', 'Dev', 'Elif'];

mountOnce(new MultiDrag());

// MultiDrag keeps ONE selection for the whole page. A selection left behind by a card would be
// dragged into the next list that multi-drags, so cards always unpick everything when they finish.
const utils = Sortable.utils as typeof Sortable.utils & { deselect(el: HTMLElement): void };
const untick = (...lists: HTMLElement[]): void => {
  for (const list of lists) for (const row of list.children) utils.deselect(row as HTMLElement);
};

// A card sits inside a link, so a click that bubbles would open the full view: fire it on the button only.
const press = (b: HTMLElement): void => void b.dispatchEvent(new MouseEvent('click', { bubbles: false }));

const mount: Mount = (el, { preview, signal }) => {
  const panels = document.createElement('div');
  panels.className = 'panels';
  el.append(panels);

  const make = (title: string, note: string, keep: boolean) => {
    const panel = document.createElement('section');
    panel.className = 'panel';
    panel.innerHTML = '<h3></h3><p class="note"></p><ul class="guests"></ul><button type="button" class="btn invite">Send invites</button><p class="result">&nbsp;</p>';
    panel.querySelector('h3')!.textContent = title;
    panel.querySelector('.note')!.textContent = note;
    const list = panel.querySelector<HTMLElement>('ul')!;
    for (const name of GUESTS.slice(0, preview ? 3 : 5)) {
      const row = document.createElement('li');
      row.className = 'guest';
      row.textContent = name;
      list.append(row);
    }
    const result = panel.querySelector<HTMLElement>('.result')!;
    const invite = panel.querySelector<HTMLButtonElement>('.invite')!;
    invite.addEventListener('click', () => {
      const n = list.querySelectorAll('.ticked').length;
      result.textContent = n ? `Invited ${n}` : 'Nobody selected!';
      result.classList.toggle('bad', !n);
    });
    const sortable = Sortable.create(list, {
      multiDrag: true,
      selectedClass: 'ticked',
      animation: 150,
      // false (default): a click anywhere outside the list, a button included, clears the selection.
      // true: only tapping the ticked items themselves changes it.
      avoidImplicitDeselect: keep,
    });
    panels.append(panel);
    return { list, invite, result, sortable };
  };

  const losing = make('Default', 'Clicking outside clears the ticks', false);
  const keeping = make('avoidImplicitDeselect', 'Ticks stay until you untick them', true);

  if (preview) {
    loopDrive(el, signal, async (hand) => {
      for (const p of [losing, keeping]) {
        await hand.tap(p.list.children[0]!);
        await hand.wait(0.25);
        await hand.tap(p.list.children[1]!);
        await hand.wait(0.4);
        await hand.tap(p.invite); // the plugin hears the release first,
        press(p.invite); // then the click handler runs, just like a real press
        await hand.wait(0.8);
      }
      await hand.wait(0.8);
      // Tidy up for the next round: untick the kept ones and clear the messages.
      await hand.tap(keeping.list.children[0]!);
      await hand.tap(keeping.list.children[1]!);
      for (const p of [losing, keeping]) p.result.innerHTML = '&nbsp;';
      untick(losing.list, keeping.list);
    }, 0.3);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Tick two guests in each list, then press its button. The default list has already forgotten the ticks by the time the button reacts.';
    el.append(hint);
  }

  return () => untick(losing.list, keeping.list);
    release(losing.sortable, keeping.sortable);
};

export default mount;
