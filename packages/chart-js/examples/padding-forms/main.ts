// layout.padding as a number, an {x, y} pair or per side, edge outlined
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const FORMS = ['number', '{x, y}', '{top, right, bottom, left}'] as const;
type Form = (typeof FORMS)[number];
type Padding = number | { x: number; y: number } | { top: number; right: number; bottom: number; left: number };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  const v = { all: 24, x: 40, y: 10, top: 30, right: 8, bottom: 0, left: 60 };
  let form: Form = 'number';

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Visitors', data: [120, 150, 135, 180, 210, 260, 190], backgroundColor: alpha(C.green, 0.6), borderColor: C.green, borderWidth: 1 }],
    },
    options: { maintainAspectRatio: false, layout: { padding: 0 }, plugins: { legend: { display: false } } },
    plugins: [
      {
        // Outlines the whole canvas, so the margin set by layout.padding is visible.
        id: 'showcase-canvas-edge',
        beforeDraw(c) {
          c.ctx.save();
          c.ctx.fillStyle = 'rgba(250, 250, 250, 0.04)';
          c.ctx.fillRect(0, 0, c.width, c.height);
          c.ctx.strokeStyle = C.pink;
          c.ctx.setLineDash([5, 4]);
          c.ctx.strokeRect(0.5, 0.5, c.width - 1, c.height - 1);
          c.ctx.restore();
        },
      },
    ],
  });

  const padding = (f: Form): Padding =>
    f === 'number' ? v.all : f === '{x, y}' ? { x: v.x, y: v.y } : { top: v.top, right: v.right, bottom: v.bottom, left: v.left };
  const code = (f: Form): string =>
    f === 'number'
      ? `padding: ${v.all}`
      : f === '{x, y}'
        ? `padding: { x: ${v.x}, y: ${v.y} }`
        : `padding: { top: ${v.top}, left: ${v.left}, … }`;

  const apply = (f: Form): void => {
    form = f;
    chart.options.layout!.padding = padding(f);
    chart.update();
    label.textContent = ctx.preview ? code(f) : `layout.${code(f)}`;
  };
  apply(form);

  if (bar) {
    // Each form has its own sliders; the others are hidden.
    const groups = new Map<Form, HTMLElement[]>();
    const add = (f: Form, text: string, key: keyof typeof v, max: number): void => {
      const input = slider(bar, text, [0, max, 1], v[key], (n) => ((v[key] = n), apply(form)));
      groups.set(f, [...(groups.get(f) ?? []), input.parentElement!]);
    };
    select(bar, 'form', FORMS, form, (f) => {
      for (const [g, nodes] of groups) for (const n of nodes) n.style.display = g === f ? 'flex' : 'none';
      apply(f);
    });
    add('number', 'all sides', 'all', 80);
    add('{x, y}', 'x', 'x', 100);
    add('{x, y}', 'y', 'y', 60);
    add('{top, right, bottom, left}', 'top', 'top', 80);
    add('{top, right, bottom, left}', 'right', 'right', 100);
    add('{top, right, bottom, left}', 'bottom', 'bottom', 60);
    add('{top, right, bottom, left}', 'left', 'left', 100);
    for (const [g, nodes] of groups) for (const n of nodes) n.style.display = g === form ? 'flex' : 'none';
  }

  const states: readonly (readonly [Form, Partial<typeof v>])[] = [
    ['number', { all: 24 }],
    ['{x, y}', { x: 50, y: 6 }],
    ['{top, right, bottom, left}', { top: 40, right: 0, bottom: 0, left: 70 }],
  ];
  const stop = ctx.preview
    ? cycle(states, 2000, ([f, values]) => {
        Object.assign(v, values);
        apply(f);
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
