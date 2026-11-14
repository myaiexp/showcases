// A boarding queue: onMove forces the side an item lands on, by fare class
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const PASSENGERS = [
  { name: 'Ines', fare: 'priority' },
  { name: 'Omar', fare: 'priority' },
  { name: 'Lena', fare: 'standard' },
  { name: 'Jun', fare: 'standard' },
  { name: 'Aino', fare: 'standard' },
];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'queue';
  for (const p of PASSENGERS) {
    const li = document.createElement('li');
    li.className = `pax ${p.fare}`;
    li.innerHTML = '<span class="name"></span><span class="fare"></span>';
    li.querySelector('.name')!.textContent = p.name;
    li.querySelector('.fare')!.textContent = p.fare;
    list.append(li);
  }
  const readout = document.createElement('p');
  readout.className = 'readout';
  readout.textContent = 'Drag a passenger over the queue';
  el.append(list, readout);
  el.classList.toggle('compact', preview);

  const sortable = Sortable.create(list, {
    animation: 150,
    ghostClass: 'ghost',
    onMove: (evt) => {
      const dragged = evt.dragged.classList.contains('priority');
      const over = evt.related.classList.contains('priority');
      const default_ = evt.willInsertAfter ? 'after' : 'before';
      // Standard over priority: always behind. Priority over standard: always ahead.
      // Same class: return true and keep Sortable's own choice.
      let verdict: -1 | 1 | true = true;
      if (!dragged && over) verdict = 1;
      else if (dragged && !over) verdict = -1;
      const forced = verdict === 1 ? 'after' : verdict === -1 ? 'before' : default_;
      readout.textContent = `over ${evt.related.querySelector('.name')!.textContent}: Sortable says ${default_}, we say ${forced}`;
      return verdict;
    },
    onEnd: () => {
      readout.textContent = 'Priority passengers board first';
    },
  });

  if (preview) {
    // Drag the last standard passenger toward the front: it stops behind the last priority one.
    loopDrive(el, signal, async (hand) => {
      const lastPriority = [...list.querySelectorAll('.priority')].at(-1)!;
      await hand.drag(list.lastElementChild!, { el: lastPriority, fy: 0.7 }, 1.1);
    }, 0.6);
  } else {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Try dropping a standard ticket at the front, or a priority one at the back.';
    el.append(hint);
  }

  return () => release(sortable);
};

export default mount;
