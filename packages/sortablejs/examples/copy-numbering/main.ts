// A seating-plan palette whose copies are numbered as they are created
import Sortable from 'sortablejs';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { loopDrive } from '../../shared/drive.ts';
import { release } from '../../shared/lifecycle.ts';
import './style.css';

const TEMPLATES = [
  { kind: 'Round table', glyph: '◯', seats: 8 },
  { kind: 'Long table', glyph: '▭', seats: 12 },
  { kind: 'Bar stools', glyph: '⋯', seats: 5 },
];

const mount: Mount = (el, { preview, signal }) => {
  const wrap = document.createElement('div');
  wrap.className = preview ? 'planner compact' : 'planner';
  wrap.innerHTML = '<section><h3>Templates</h3><ul class="palette"></ul></section><section><h3>Floor plan</h3><ul class="plan"></ul></section>';
  const palette = wrap.querySelector<HTMLUListElement>('.palette')!;
  const plan = wrap.querySelector<HTMLUListElement>('.plan')!;
  const label = (li: HTMLElement, text: string): void => {
    li.querySelector('.name')!.textContent = text;
  };
  for (const t of TEMPLATES) {
    const li = document.createElement('li');
    li.className = 'tpl';
    li.dataset['kind'] = t.kind;
    li.innerHTML = '<span class="glyph"></span><span class="name"></span><small></small>';
    li.querySelector('.glyph')!.textContent = t.glyph;
    li.querySelector('small')!.textContent = `${t.seats} seats`;
    label(li, t.kind);
    palette.append(li);
  }
  el.append(wrap);

  // Copies made so far, per kind. A number is only used up once a copy lands on the plan.
  const made: Record<string, number> = {};
  const next = (kind: string): number => (made[kind] ?? 0) + 1;

  const sortables = [
    Sortable.create(palette, { group: { name: 'tables', pull: 'clone', put: false }, sort: false, animation: 150,
      // The dragged item is the new copy; the one staying behind (evt.clone) keeps the template name.
      onClone: (e) => {
        const kind = e.item.dataset['kind']!;
        label(e.item, `${kind} ${next(kind)}`);
      },
      // Dropped back on the palette? Then it was never a copy: restore the template name.
      onEnd: (e) => {
        if (e.to === palette) label(e.item, e.item.dataset['kind']!);
      },
    }),
    Sortable.create(plan, { group: 'tables', animation: 150, ghostClass: 'ghost',
      onAdd: (e) => {
        const kind = e.item.dataset['kind']!;
        made[kind] = next(kind);
      },
    }),
  ];

  if (!preview) {
    const hint = document.createElement('p');
    hint.className = 'hint';
    hint.textContent = 'Drag templates onto the plan as often as you like. Each copy is numbered.';
    const bar = document.createElement('div');
    bar.className = 'bar';
    button(bar, 'Clear plan', () => {
      plan.replaceChildren();
      for (const k of Object.keys(made)) made[k] = 0;
    });
    el.append(hint, bar);
  } else {
    let n = 0;
    loopDrive(el, signal, async (hand) => {
      if (plan.children.length >= 3) {
        plan.replaceChildren();
        for (const k of Object.keys(made)) made[k] = 0;
        await hand.wait(0.3);
      }
      const src = palette.children[n++ % 2]!;
      await hand.drag(src, plan.lastElementChild ? { el: plan.lastElementChild, fy: 0.9 } : plan, 0.9);
    }, 0.5);
  }

  return () => release(...sortables);
};

export default mount;
