// An inbox and an archive that log every Sortable event as a drag unfolds
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const LISTS = [
  { name: 'Inbox', items: ['Invoice', 'Newsletter', 'Postcard'] },
  { name: 'Archive', items: ['Receipt', 'Contract'] },
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'wrap compact' : 'wrap';
  wrap.innerHTML = '<div class="lists"></div><div class="log" aria-live="off"></div>';
  const lists = wrap.querySelector('.lists')!;
  const logEl = wrap.querySelector<HTMLElement>('.log')!;

  // The log shows the last drag only: it starts over at "choose". Events that repeat while the
  // pointer travels (move, change) keep one line with a counter, so the whole order stays visible.
  let finished = true;
  const repeats = new Map<string, { row: HTMLElement; n: number }>();
  const write = (event: string, detail: string): void => {
    if (event === 'choose' && finished) {
      logEl.replaceChildren();
      repeats.clear();
    }
    finished = event === 'end';
    const seen = repeats.get(event);
    if (seen) {
      seen.row.querySelector('span')!.textContent = detail;
      seen.row.querySelector('.n')!.textContent = `×${++seen.n}`;
      return;
    }
    const row = document.createElement('div');
    row.className = 'row';
    row.dataset['event'] = event;
    row.innerHTML = '<b></b><span></span><i class="n"></i>';
    row.querySelector('b')!.textContent = event;
    row.querySelector('span')!.textContent = detail;
    logEl.append(row);
    while (logEl.childElementCount > (preview ? 12 : 14)) logEl.firstElementChild!.remove();
    if (event === 'move' || event === 'change') repeats.set(event, { row, n: 1 });
  };

  const ul: HTMLUListElement[] = [];
  const sortables = LISTS.map((l) => {
    const box = document.createElement('section');
    box.innerHTML = '<h3></h3><ul class="items"></ul>';
    box.querySelector('h3')!.textContent = l.name;
    const list = box.querySelector('ul')!;
    for (const name of l.items) {
      const li = document.createElement('li');
      li.className = 'item';
      li.textContent = name;
      list.append(li);
    }
    lists.append(box);
    ul.push(list);

    // One handler per event name, all writing to the same log.
    const say = (event: string) => (e: Sortable.SortableEvent): void => {
      const pos = e.oldIndex === undefined ? '' : e.newIndex === undefined || e.newIndex === e.oldIndex ? `#${e.oldIndex + 1}` : `#${e.oldIndex + 1} to #${e.newIndex + 1}`;
      write(event, preview ? `${e.item.textContent ?? ''} ${pos}`.trim() : `${e.item.textContent ?? ''} ${pos} in ${l.name}`.trim());
    };
    return Sortable.create(list, {
      group: { name: 'mail', pull: true, put: true },
      animation: 150,
      ghostClass: 'ghost',
      onChoose: say('choose'), // pressed on an item
      onUnchoose: say('unchoose'), // let go (or the press was cancelled)
      onStart: say('start'), // the drag really began
      onMove: (e) => void write('move', `over ${e.related.textContent ?? ''}`), // pointer crossed another item
      onChange: say('change'), // the dragged item took a new spot
      onSort: say('sort'), // either list's order changed
      onUpdate: say('update'), // reordered inside its own list
      onAdd: say('add'), // arrived from another list
      onRemove: say('remove'), // left for another list
      onEnd: say('end'), // the drop is complete
      onClone: say('clone'), // Sortable made its stand-in copy of the item, on every drag
    });
  });
  el.append(wrap);

  if (!preview) {
    // In copy mode the original stays behind; the same events fire, and the item's pullMode becomes "clone".
    const row = document.createElement('div');
    row.className = 'bar';
    checkbox(row, 'Copy instead of move', false, (copy) => {
      sortables[0]!.option('group', { name: 'mail', pull: copy ? 'clone' : true, put: true });
    });
    el.append(row);
  } else {
    let step = 0;
    loopDrive(el, signal, async (hand) => {
      const [inbox, archive] = ul as [HTMLUListElement, HTMLUListElement];
      const s = step++ % 3;
      if (s === 0) await hand.drag(inbox.firstElementChild!, { el: archive.firstElementChild!, fy: 0.2 }, 0.9);
      else if (s === 1) await hand.drag(archive.lastElementChild!, { el: inbox.firstElementChild!, fy: 0.2 }, 0.9);
      else await hand.drag(inbox.lastElementChild!, { el: inbox.firstElementChild!, fy: 0.2 }, 0.8);
    }, 1.2);
  }

  return () => release(...sortables);
};

export default mount;
