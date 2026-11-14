// Tick several emails and drag them into a folder in one move
import Sortable, { MultiDrag } from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import './style.css';

const MAIL = [
  ['Maya', 'Lunch on Friday?'],
  ['Omar', 'Venue contract'],
  ['Billing', 'Invoice 2041'],
  ['Priya', 'Saturday photos'],
  ['Shop', 'Your receipt'],
  ['Sam', 'Board game night'],
] as const;
const FOLDERS = [
  { name: 'Work', color: 'var(--blue)' },
  { name: 'Receipts', color: 'var(--green)' },
  { name: 'Friends', color: 'var(--orange)' },
];

mountOnce(new MultiDrag());

// MultiDrag keeps ONE selection for the whole page. A selection left behind by a card would be
// dragged into the next list that multi-drags, so cards always unpick everything when they finish.
const utils = Sortable.utils as typeof Sortable.utils & { deselect(el: HTMLElement): void };
const untick = (...lists: HTMLElement[]): void => {
  for (const list of lists) for (const row of list.children) utils.deselect(row as HTMLElement);
};

const mount: Mount = (el, { preview, signal }) => {
  const layout = document.createElement('div');
  layout.className = 'layout';
  layout.innerHTML = '<section class="box inbox"><h3>Inbox</h3><ul class="mails"></ul></section><div class="folders"></div>';
  const inboxList = layout.querySelector<HTMLElement>('.mails')!;
  const folderLists: HTMLElement[] = [];
  for (const f of FOLDERS.slice(0, preview ? 2 : 3)) {
    const box = document.createElement('section');
    box.className = 'box folder';
    box.style.setProperty('--tone', f.color);
    box.innerHTML = '<h3></h3><ul class="mails"></ul>';
    box.querySelector('h3')!.textContent = `📁 ${f.name}`;
    folderLists.push(box.querySelector<HTMLElement>('ul')!);
    layout.querySelector('.folders')!.append(box);
  }
  for (const [who, subject] of MAIL.slice(0, preview ? 5 : 6)) {
    const row = document.createElement('li');
    row.className = 'mail';
    row.innerHTML = '<b></b><span></span>';
    row.querySelector('b')!.textContent = who;
    row.querySelector('span')!.textContent = subject;
    inboxList.append(row);
  }
  el.append(layout);

  // One shared group lets mails cross between lists; multiDrag makes the whole selection cross at once.
  const sortables = [inboxList, ...folderLists].map((list) =>
    Sortable.create(list, {
      group: 'mailbox',
      multiDrag: true,
      selectedClass: 'ticked',
      animation: 150,
    }),
  );

  if (preview) {
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const inbox = [...inboxList.children];
      if (inbox.length >= 3) {
        // Tick two mails and move them into a folder together.
        const target = folderLists[turn++ % folderLists.length]!;
        await hand.tap(inbox[0]!);
        await hand.wait(0.25);
        await hand.tap(inbox[1]!);
        await hand.wait(0.4);
        await hand.drag(inbox[1]!, target, 1.1);
      } else {
        // Inbox nearly empty: send everything in the first filled folder back.
        const from = folderLists.find((l) => l.children.length)!;
        for (const row of [...from.children]) {
          await hand.tap(row);
          await hand.wait(0.2);
        }
        await hand.drag(from.lastElementChild!, inboxList, 1.1);
      }
      await hand.wait(0.8);
      untick(inboxList, ...folderLists);
    }, 0.4);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Tap two or three mails to tick them, then drag one into a folder: they all go. Drag them back the same way.';
    el.append(hint);
  }

  return () => {
    untick(inboxList, ...folderLists);
    release(...sortables);
  };
};

export default mount;
