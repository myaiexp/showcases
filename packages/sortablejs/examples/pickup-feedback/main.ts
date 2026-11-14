// An inbox and archive: pick-up and drop events drive a status line and a drop-zone hint
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const MAIL = ['Team lunch', 'Flight receipt', 'Gym renewal', 'Photo prints', 'Survey'];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = 'mail';
  wrap.innerHTML =
    '<p class="info"></p><div class="cols"><section><h3>Inbox</h3><ul class="msgs inbox"></ul></section>' +
    '<section class="zone"><h3>Archive <em>drop here</em></h3><ul class="msgs archive"></ul></section></div>';
  const inbox = wrap.querySelector<HTMLUListElement>('.inbox')!;
  const archive = wrap.querySelector<HTMLUListElement>('.archive')!;
  const status = wrap.querySelector('.info')!;
  for (const m of MAIL) {
    const li = document.createElement('li');
    li.className = 'msg';
    li.textContent = m;
    inbox.append(li);
  }
  el.append(wrap);
  el.classList.toggle('compact', preview);

  const where = (e: Sortable.SortableEvent): string => (e.to === archive ? 'the archive' : 'the inbox');
  const options: Sortable.Options = {
    group: 'mail',
    animation: 150,
    ghostClass: 'ghost',
    onChoose: (e) => { // pressed: the message lifts, nothing has moved yet
      e.item.classList.add('lifted');
      status.textContent = `Got "${e.item.textContent}"`;
    },
    onUnchoose: (e) => e.item.classList.remove('lifted'), // let go, wherever it ended up
    onStart: (e) => { // the drag is on: show where it can go
      wrap.classList.add('dragging');
      status.textContent = `Carrying "${e.item.textContent}"…`;
    },
    onEnd: (e) => { // dropped: hide the hint again
      wrap.classList.remove('dragging');
      status.textContent = `Dropped "${e.item.textContent}" in ${where(e)}`;
    },
  };
  status.textContent = 'Drag a message to the archive';
  const sortables = [inbox, archive].map((ul) => Sortable.create(ul, options));

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Press and hold a message: it lifts. Drag, and the archive shows where to drop.';
    el.append(hint);
  } else {
    loopDrive(el, signal, async (hand) => {
      // Fill the archive with two messages, then send them back.
      if (archive.children.length < 2 && inbox.children.length > 3) await hand.drag(inbox.firstElementChild!, { el: archive, fy: 0.3 }, 1, { hold: 0.2 });
      else if (archive.firstElementChild) await hand.drag(archive.firstElementChild, { el: inbox.lastElementChild!, fy: 0.9 }, 1, { hold: 0.2 });
      else await hand.drag(inbox.firstElementChild!, { el: archive, fy: 0.3 }, 1);
    }, 0.8);
  }

  return () => release(...sortables);
};

export default mount;
