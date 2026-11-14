// FAQ: a click event gives datum and position; show a small action menu there
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';

const NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
type Row = { x: string; y: number };

const mount: Mount = (el, ctx) => {
  const all: Row[] = NAMES.map((x, i) => ({ x, y: [22, 31, 18, 40, 27, 35][i] ?? 0 }));
  let rows = all;
  const out = ctx.preview ? null : readout(el);
  const { vchart, release, container } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'd', values: rows }],
    xField: 'x',
    yField: 'y',
    bar: { state: { selected: { stroke: '#ffffff', lineWidth: 2 } } },
    tooltip: { visible: false },
  });
  container.style.position = 'relative';
  const menu = document.createElement('div');
  menu.style.cssText =
    'position:absolute;display:none;flex-direction:column;gap:2px;padding:4px;background:#1c1e24;border:1px solid #444;border-radius:6px;z-index:5;font-size:12px';
  container.append(menu);
  let alive = true;
  const say = (t: string): void => {
    if (out) out.textContent = t;
  };
  const open = (d: Row, x: number, y: number): void => {
    menu.replaceChildren();
    const item = (label: string, run: () => void): void => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', () => {
        run();
        menu.style.display = 'none';
      });
      menu.append(b);
    };
    item('Select', () => {
      vchart.setSelected({ x: d.x });
      say(`select ${d.x}`);
    });
    item('Remove', () => {
      rows = rows.filter((r) => r.x !== d.x);
      void vchart.updateData('d', rows);
      say(`removed ${d.x}`);
    });
    item(`Show ${d.x}`, () => say(`datum: ${JSON.stringify(d)}`));
    menu.style.left = `${x + 6}px`;
    menu.style.top = `${y + 6}px`;
    menu.style.display = 'flex';
  };
  // The click event: e.datum is the bar's row, e.event the pointer event.
  vchart.on('click', { markName: 'bar' }, (e) => {
    const ev = e.event as unknown as { clientX: number; clientY: number };
    const box = container.getBoundingClientRect();
    if (e.datum) open(e.datum as Row, ev.clientX - box.left, ev.clientY - box.top);
  });
  vchart.on('click', (e) => {
    if (!e.datum) menu.style.display = 'none';
  });
  say('Click a bar.');
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    button(bar, 'restore all bars', () => {
      rows = all;
      void vchart.updateData('d', rows);
    });
  }
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1200, () => {
      if (!alive) return;
      const d = rows[i++ % rows.length];
      const p = d && vchart.convertDatumToPosition(d, { seriesIndex: 0 }, true);
      if (d && p) open(d, p.x, p.y);
    });
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
