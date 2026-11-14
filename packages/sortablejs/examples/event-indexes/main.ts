// A schedule with dividers: onEnd reports row indexes and draggable-only indexes
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const DAYS = [
  { name: 'Saturday', rows: ['Morning', 'Hike', 'Brunch', 'Afternoon', 'Museum', 'Market'] },
  { name: 'Sunday', rows: ['Morning', 'Yoga', 'Afternoon', 'Picnic'] },
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'days compact' : 'days';
  const lists = DAYS.map((d) => {
    const box = document.createElement('section');
    box.innerHTML = '<h3></h3><ul class="rows"></ul>';
    box.querySelector('h3')!.textContent = d.name;
    const ul = box.querySelector('ul')!;
    ul.dataset['day'] = d.name;
    for (const r of d.rows) {
      const li = document.createElement('li');
      // "Morning" and "Afternoon" are dividers: they get no .act class, so they can't be dragged.
      const divider = r === 'Morning' || r === 'Afternoon';
      li.className = divider ? 'divider' : 'act';
      li.textContent = r;
      ul.append(li);
    }
    wrap.append(box);
    return ul;
  });
  const out = document.createElement('div');
  out.className = 'readout';
  out.innerHTML = '<p class="say">Drag an activity to see what Sortable reports.</p><dl></dl>';
  el.append(wrap, out);

  const ordinal = (i: number | undefined): string => `${(i ?? 0) + 1}`;
  const sortables = lists.map((ul) =>
    Sortable.create(ul, {
      group: { name: 'days', pull: true, put: true },
      draggable: '.act', // only activities can be picked up and displaced; dividers stay as markers
      animation: 150,
      ghostClass: 'ghost',
      onEnd: (e) => {
        const name = e.item.textContent ?? '';
        out.querySelector('.say')!.textContent =
          e.from === e.to
            ? `"${name}" moved within ${e.to.dataset['day']}.`
            : `"${name}" went from ${e.from.dataset['day']} to ${e.to.dataset['day']}${e.pullMode === 'clone' ? ' (copied)' : ''}.`;
        const rows: [string, string][] = [
          ['Row (dividers count)', `${ordinal(e.oldIndex)} to ${ordinal(e.newIndex)}`],
          ['Activity (dividers skipped)', `${ordinal(e.oldDraggableIndex)} to ${ordinal(e.newDraggableIndex)}`],
          ['pullMode', String(e.pullMode)],
        ];
        out.querySelector('dl')!.replaceChildren(
          ...rows.flatMap(([k, v]) => {
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            dt.textContent = k;
            dd.textContent = v;
            return [dt, dd];
          }),
        );
      },
    }),
  );

  if (!preview) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    // pullMode only says "clone" when the list copies instead of moving.
    checkbox(bar, 'Saturday copies instead of moves', false, (copy) => {
      sortables[0]!.option('group', { name: 'days', pull: copy ? 'clone' : true, put: true });
    });
    el.append(bar);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      const sat = lists[0]!;
      const sun = lists[1]!;
      const acts = (ul: HTMLElement): Element[] => [...ul.querySelectorAll('.act')];
      if (n++ % 2 === 0) await hand.drag(acts(sat)[0]!, { el: sun.querySelector('.act')!, fy: 0.8 }, 0.9);
      else await hand.drag(acts(sun).at(-1)!, { el: sat.querySelector('.act')!, fy: 0.2 }, 0.9);
    }, 1.3);
  }

  return () => release(...sortables);
};

export default mount;
