// width, height, padding, background and resize reshape a running view
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole } from '../../shared/api-kit.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const backgrounds = ['transparent', '#1d2a3f', '#3a2a1d', '#24303a'];
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 260, width: 460, rows: 4, title: 'getters after the last run' });

  const spec: Spec = {
    width: 260,
    height: 150,
    padding: 10,
    autosize: { type: 'pad' },
    data: [{ name: 'table', values: Array.from({ length: 9 }, (_, i) => ({ i, v: 40 + 45 * Math.abs(Math.sin(i * 0.8)) })) }, con.data],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'i' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: 'axis title widens the left margin', tickCount: 4 }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'i' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } } } }, ...con.marks],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn, renderer: 'canvas' } as ViewOptions));
  const out = makeConsole(view, stage, 4);

  const report = async (): Promise<void> => {
    const pad = view.padding() as { left: number; top: number };
    out.clear();
    out.push(
      `width() = ${view.width()}    height() = ${view.height()}`,
      `padding() = left ${pad.left}, top ${pad.top}`,
      `background() = ${String(view.background())}`,
      `origin() = [${view.origin().map((v) => Math.round(v * 10) / 10).join(', ')}]  (padding plus the autosize margin)`,
    );
    await out.show();
  };
  const apply = async (w: number, h: number, p: number, bg: string): Promise<void> => {
    // These setters only record the new values; resize() asks autosize to re-measure, runAsync applies it.
    view.width(w).height(h).padding(p).background(bg).resize();
    await view.runAsync();
    await report();
  };
  let w = 260;
  let h = 150;
  let p = 10;
  let bg = 'transparent';
  await view.runAsync();
  await report();
  if (stage.bar) {
    slider(stage.bar, 'width', [120, 400, 10], w, (v) => void apply((w = v), h, p, bg));
    slider(stage.bar, 'height', [60, 200, 10], h, (v) => void apply(w, (h = v), p, bg));
    slider(stage.bar, 'padding', [0, 50, 2], p, (v) => void apply(w, h, (p = v), bg));
    select(stage.bar, 'background', backgrounds, bg, (v) => void apply(w, h, p, (bg = v)));
    button(stage.bar, 'Reset', () => void apply((w = 260), (h = 150), (p = 10), (bg = 'transparent')));
  }
  if (stage.preview) {
    const steps: [number, number, number, string][] = [[260, 150, 10, 'transparent'], [380, 110, 4, '#1d2a3f'], [200, 170, 36, '#3a2a1d'], [320, 90, 20, '#24303a'], [260, 150, 10, 'transparent']];
    stage.every(1300, (i) => apply(...(steps[i % steps.length] ?? steps[0]!)));
  }
  return () => stage.dispose();
};

export default mount;
