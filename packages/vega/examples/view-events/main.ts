// addEventListener gets each event and its item; addResizeListener hears sizes
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { button, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 170, width: 440, rows: 6, title: 'listener calls' });

  const spec: Spec = {
    width: 440,
    height: 140,
    padding: 8,
    data: [{ name: 'table', values: ['north', 'south', 'east', 'west', 'centre'].map((k, i) => ({ k, v: [40, 75, 55, 90, 30][i] })) }, con.data],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } }, hover: { fill: { value: '#f59e0b' } } } }, ...con.marks],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn, hover: true } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 6);

  // item is the scenegraph item under the pointer, or null over empty space; its datum is the row.
  const heard = (event: Event, item: { datum?: { k?: string; v?: number } } | null | undefined): void => {
    out.push(`${event.type}: ${item?.datum ? `${item.datum.k} = ${item.datum.v}` : 'no item (the view itself)'}`);
    out.soon();
  };
  const resized = (w: number, h: number): void => {
    out.push(`resize listener: ${w} × ${h}`);
    out.soon();
  };
  const on = (flag: boolean): void => {
    for (const type of ['click', 'mouseover']) {
      if (flag) view.addEventListener(type, heard as never);
      else view.removeEventListener(type, heard as never);
    }
  };
  on(true);
  view.addResizeListener(resized);

  if (stage.bar) {
    toggle(stage.bar, 'click and mouseover listeners', true, on);
    let wide = false;
    button(stage.bar, 'view.width() change', () => void view.width((wide = !wide) ? 340 : 440).runAsync());
  }
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    stage.every(800, (i) => {
      const k = ['north', 'south', 'east', 'west', 'centre'][i % 5] ?? 'north';
      ghost.move(x(k) + x.bandwidth() / 2, 100);
      if (i % 3 === 0) ghost.click(x(k) + x.bandwidth() / 2, 100);
      if (i % 10 === 0) void view.width(i % 20 === 0 ? 440 : 360).runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
