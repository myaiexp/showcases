// view.tooltip(handler) replaces the browser tooltip with an element of your own
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 170,
    padding: 8,
    data: [{ name: 'table', values: [['Mon', 31, 'rain'], ['Tue', 55, 'sun'], ['Wed', 72, 'sun'], ['Thu', 44, 'cloud'], ['Fri', 86, 'sun'], ['Sat', 63, 'cloud']].map(([day, temp, sky]) => ({ day, temp, sky })) }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'day' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'day' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'temp' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' }, tooltip: { signal: 'datum' } }, hover: { fill: { value: '#f59e0b' } } } }],
  };

  // The tip lives inside the stage frame, so it scales with the card and goes away with the example.
  const frame = stage.options.container.parentElement ?? el;
  const tip = document.createElement('div');
  Object.assign(tip.style, { position: 'absolute', pointerEvents: 'none', display: 'none', padding: '6px 9px', border: '1px solid #f59e0b', borderRadius: '6px', background: '#141922', color: '#e6e8ee', font: '12px monospace', whiteSpace: 'pre', zIndex: '5' });
  frame.append(tip);
  stage.own(() => tip.remove());

  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn, hover: true } as ViewOptions));
  // handler is Vega's scenegraph handler, event the DOM event, item the mark item, value the tooltip signal.
  view.tooltip((_handler, event, _item, value) => {
    if (value == null) {
      tip.style.display = 'none';
      return;
    }
    const v = value as { day: string; temp: number; sky: string };
    tip.textContent = `${v.day}\n${v.temp} degrees\n${v.sky}`;
    const box = frame.getBoundingClientRect();
    const scale = box.width / (frame.offsetWidth || box.width);
    const e = event as MouseEvent;
    tip.style.display = 'block';
    tip.style.left = `${(e.clientX - box.left) / scale + 12}px`;
    tip.style.top = `${(e.clientY - box.top) / scale - 8}px`;
  });
  await view.runAsync();

  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    stage.every(900, (i) => ghost.move(x(days[i % days.length]) + x.bandwidth() / 2, 130 - (i % 3) * 30));
  }
  return () => stage.dispose();
};

export default mount;
