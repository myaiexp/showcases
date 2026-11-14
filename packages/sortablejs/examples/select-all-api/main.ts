// An inbox with Select all and Clear buttons and a live "3 selected" count
import Sortable, { MultiDrag } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const MAIL = [
  ['Maya Chen', 'Lunch on Friday?', 'var(--blue)'],
  ['GitHub', 'Your build passed', 'var(--green)'],
  ['Omar Haddad', 'Re: venue contract', 'var(--orange)'],
  ['Billing', 'Invoice 2041 is ready', 'var(--red)'],
  ['Priya Nair', 'Photos from Saturday', 'var(--accent)'],
  ['The Weekly', 'Ten things we liked', 'var(--fg-3)'],
] as const;

mountOnce(new MultiDrag());

// select() and deselect() are on Sortable.utils at runtime but missing from the type definitions.
const utils = Sortable.utils as typeof Sortable.utils & { select(el: HTMLElement): void; deselect(el: HTMLElement): void };

// A card sits inside a link, so a click that bubbles would open the full view: fire it on the button only.
const press = (b: HTMLElement): void => void b.dispatchEvent(new MouseEvent('click', { bubbles: false }));

const mount: Mount = (el, { preview, signal }) => {
  const inbox = document.createElement('div');
  inbox.className = 'inbox';
  const bar = document.createElement('div');
  bar.className = 'toolbar';
  const list = document.createElement('ul');
  list.className = 'mails';
  for (const [who, subject, color] of MAIL.slice(0, preview ? 5 : 6)) {
    const row = document.createElement('li');
    row.className = 'mail';
    row.innerHTML = '<span class="avatar"></span><span class="who"></span><span class="subject"></span>';
    row.querySelector('.avatar')!.textContent = who[0]!;
    (row.querySelector('.avatar') as HTMLElement).style.background = color;
    row.querySelector('.who')!.textContent = who;
    row.querySelector('.subject')!.textContent = subject;
    list.append(row);
  }
  inbox.append(bar, list);
  el.append(inbox);

  const count = document.createElement('span');
  count.className = 'count';
  const refresh = (): void => {
    const n = list.querySelectorAll('.ticked').length;
    count.textContent = n ? `${n} selected` : 'none selected';
  };

  const sortable = Sortable.create(list, {
    multiDrag: true,
    selectedClass: 'ticked',
    avoidImplicitDeselect: true, // pressing a toolbar button must not clear the selection first
    animation: 150,
    // Fired for taps. The select()/deselect() helpers below do NOT fire these events,
    // so the buttons call refresh() themselves.
    onSelect: refresh,
    onDeselect: refresh,
  });

  const selectAll = button(bar, 'Select all', () => {
    for (const row of list.children) utils.select(row as HTMLElement);
    refresh();
  });
  const clear = button(bar, 'Clear', () => {
    for (const row of [...list.children]) utils.deselect(row as HTMLElement);
    refresh();
  });
  bar.append(count);
  refresh();

  if (preview) {
    loopDrive(el, signal, async (hand) => {
      const rows = [...list.children];
      await hand.tap(rows[1]!);
      await hand.wait(0.3);
      await hand.tap(rows[3]!);
      await hand.wait(1);
      press(selectAll);
      await hand.wait(1.2);
      press(clear);
      await hand.wait(0.8);
    }, 0.3);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Tap mails to tick them, or use the buttons. Ticked mails can be dragged together.';
    el.append(hint);
  }

  return () => {
    for (const row of list.children) utils.deselect(row as HTMLElement); // the selection is page-wide: leave none behind
    release(sortable);
  };
};

export default mount;
