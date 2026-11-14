// A menu planner whose options are read and changed at runtime with option()
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { bar, checkbox, slider } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const MENU = [
  ['Mon', 'Lentil soup'],
  ['Tue', 'Fish tacos'],
  ['Wed', 'Mushroom risotto'],
  ['Thu', 'Falafel bowl'],
  ['Fri', 'Homemade pizza'],
];

const mount: Mount = (el, { preview, signal }) => {
  const list = document.createElement('ul');
  list.className = 'menu';
  for (const [day, dish] of MENU) {
    const li = document.createElement('li');
    li.className = 'dish';
    li.innerHTML = '<span class="day"></span><span class="what"></span>';
    li.querySelector('.day')!.textContent = day!;
    li.querySelector('.what')!.textContent = dish!;
    list.append(li);
  }
  const state = document.createElement('p');
  state.className = 'state';
  el.append(list, state);
  el.classList.toggle('compact', preview);

  const sortable = Sortable.create(list, { animation: 150, ghostClass: 'ghost', delay: 0 });

  // option(name) reads a setting, option(name, value) changes it on the live list.
  const refresh = (): void => {
    const locked = sortable.option('disabled');
    list.classList.toggle('locked', !!locked);
    state.textContent = `disabled: ${locked} · sort: ${sortable.option('sort')} · animation: ${sortable.option('animation')} · delay: ${sortable.option('delay')}`;
  };
  refresh();

  if (!preview) {
    const panel = bar(el);
    checkbox(panel, 'Locked (disabled)', false, (v) => { sortable.option('disabled', v); refresh(); });
    checkbox(panel, 'Allow reordering (sort)', true, (v) => { sortable.option('sort', v); refresh(); });
    slider(panel, 'Slide speed', 0, 600, 50, 150, (v) => { sortable.option('animation', v); refresh(); }, (v) => `${v} ms`);
    slider(panel, 'Hold to drag', 0, 1000, 100, 0, (v) => { sortable.option('delay', v); refresh(); }, (v) => `${v} ms`);
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag a dish, then change a setting and drag again. The line above the panel reads the values back.';
    el.append(hint);
  } else {
    // Lock the list and try to drag (nothing moves), then unlock and drag for real.
    loopDrive(el, signal, async (hand) => {
      sortable.option('disabled', true);
      refresh();
      await hand.wait(0.3);
      await hand.drag(list.firstElementChild!, { el: list.lastElementChild!, fy: 0.8 }, 0.8);
      await hand.wait(0.3);
      sortable.option('disabled', false);
      refresh();
      await hand.wait(0.3);
      await hand.drag(list.firstElementChild!, { el: list.lastElementChild!, fy: 0.8 }, 0.8);
    }, 0.6);
  }

  return () => release(sortable);
};

export default mount;
