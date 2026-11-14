// Two plain lists and an activity feed that is fed by a plugin none of the lists enabled
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { mountOnce, release } from '../../shared/lifecycle.ts';
import Spy, { watched } from './plugin.ts';
import './style.css';

// Mount before creating any list: a plugin is only instantiated on Sortables created after it.
mountOnce(Spy as unknown as Parameters<typeof mountOnce>[0]);

const COLUMNS = [
  { title: 'Waiting', items: ['Parcel 17', 'Parcel 18', 'Parcel 19'] },
  { title: 'Shipped', items: ['Parcel 16'] },
];

const mount: Mount = (el, { preview, signal }) => {
  const board = document.createElement('div');
  board.className = 'board';
  const lists = COLUMNS.map((col) => {
    const section = document.createElement('section');
    section.className = 'col';
    section.innerHTML = '<h3></h3><ul class="parcels"></ul>';
    section.querySelector('h3')!.textContent = col.title;
    const ul = section.querySelector<HTMLElement>('ul')!;
    ul.dataset['title'] = col.title;
    for (const text of col.items) {
      const li = document.createElement('li');
      li.className = 'parcel';
      li.textContent = text;
      ul.append(li);
    }
    board.append(section);
    return ul;
  });
  const feed = document.createElement('ul');
  feed.className = 'feed';
  el.append(board, feed);

  const news = (text: string): void => {
    const row = document.createElement('li');
    row.textContent = text;
    feed.prepend(row);
    while (feed.children.length > (preview ? 3 : 6)) feed.lastElementChild!.remove();
  };
  // Tell the plugin which lists to report on and where. Neither list is given any plugin option.
  for (const ul of lists) watched.set(ul, news);

  const sortables = lists.map((ul) => Sortable.create(ul, { group: 'parcels', animation: 150 }));

  if (preview) {
    let turn = 0;
    loopDrive(el, signal, async (hand) => {
      const [from, to] = turn++ % 2 ? [lists[1]!, lists[0]!] : [lists[0]!, lists[1]!];
      const item = [...from.children].find((c) => !c.classList.contains('sortable-fallback'));
      if (item) await hand.drag(item, to.firstElementChild ? { el: to.firstElementChild, fy: 0.2 } : to, 1);
    }, 0.6);
  } else {
    news('Drag a parcel: the feed hears about it');
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Neither list switches the plugin on. Its dragStartGlobal and dropGlobal handlers still hear every drag and write this feed, but only for these two lists.';
    el.append(hint);
  }

  return () => {
    for (const ul of lists) watched.delete(ul);
    release(...sortables);
  };
};

export default mount;
