// An album ranking saved to localStorage by the README's store, rebuilt on demand
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const ALBUMS = ['Blue Hour', 'Paper Planes', 'Night Shift', 'Slow Rivers', 'Golden Static'];
// The store key comes from the group name. Cards use their own, so they never touch the full view's order.
const PREFIX = 'showcases-sortablejs-remember-order:';

const mount: Mount = (el, { preview, signal }) => {
  const group = preview ? 'remember-order-card' : 'remember-order';
  const key = PREFIX + group;
  // Cards start from a clean slate every time; the full view keeps what you did last visit.
  if (preview) localStorage.removeItem(key);

  const head = document.createElement('div');
  head.className = 'head';
  head.innerHTML = '<span class="note"></span>';
  const list = document.createElement('ol');
  list.className = 'albums';
  el.append(head, list);
  el.classList.toggle('compact', preview);
  const note = head.querySelector('.note')!;
  let sortable: Sortable | null = null;

  const build = (): void => {
    if (sortable?.el) sortable.destroy();
    list.replaceChildren();
    for (const a of ALBUMS) {
      const li = document.createElement('li');
      li.className = 'album';
      li.dataset['id'] = a;
      li.textContent = a;
      list.append(li); // always created in the original order...
    }
    sortable = Sortable.create(list, {
      group, // its name doubles as the storage key
      animation: 150,
      ghostClass: 'ghost',
      store: {
        // ...and store.get puts them back in the saved order while the list is created.
        get: (s) => {
          const order = localStorage.getItem(PREFIX + groupName(s));
          return order ? order.split('|') : [];
        },
        // set runs after every drop.
        set: (s) => localStorage.setItem(PREFIX + groupName(s), s.toArray().join('|')),
      },
    });
  };
  const groupName = (s: Sortable): string => {
    const g = s.options.group;
    return typeof g === 'string' ? g : (g?.name ?? '');
  };
  const flash = (text: string): void => {
    note.textContent = text;
  };
  build();
  flash(localStorage.getItem(key) ? 'Restored your saved order' : 'Drag to rank');

  const reload = (): void => {
    build();
    flash('Reloaded: rebuilt from the saved order');
  };
  if (!preview) {
    button(head, 'Reload list', reload);
    button(head, 'Reset', () => {
      localStorage.removeItem(key);
      build();
      flash('Cleared: back to the original order');
    });
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Rank the albums, then reload the list, or even the whole page: your order stays.';
    el.append(hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      flash('Drag to rank');
      await hand.drag(list.lastElementChild!, { el: list.firstElementChild!, fy: 0.2 }, 0.9);
      await hand.wait(0.6);
      list.replaceChildren(); // the list vanishes...
      await hand.wait(0.4);
      reload(); // ...and is rebuilt in the saved order
      await hand.wait(1);
    }, 0.4);
  }

  return () => {
    if (preview) localStorage.removeItem(key);
    if (sortable) release(sortable);
  };
};

export default mount;
