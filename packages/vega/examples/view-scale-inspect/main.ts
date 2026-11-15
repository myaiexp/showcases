// view.scale(name) returns the live scale: read its domain, range and ticks
import * as vega from 'vega';
import type { Spec, ViewOptions } from 'vega';
import type { Mount } from '@/types.ts';
import { consoleParts, makeConsole, show } from '../../shared/api-kit.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const con = consoleParts({ x: 0, y: 188, width: 480, rows: 8, title: 'view.scale() read-outs' });

  const spec: Spec = {
    width: 400,
    height: 150,
    padding: 8,
    data: [{ name: 'table', values: ['A', 'B', 'C', 'D', 'E'].map((k, i) => ({ k, v: [34, 72, 51, 88, 20][i] })) }, con.data],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.2 },
      { name: 'y', type: 'linear', domain: { data: 'table', field: 'v' }, nice: true, range: 'height' },
      { name: 'color', type: 'quantize', domain: [0, 100], range: ['#1d4e89', '#4b9cd3', '#f59e0b'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', tickCount: 5 }],
    marks: [{ type: 'rect', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'color', field: 'v' } } } }, ...con.marks],
  };
  const view = stage.adopt(new vega.View(vega.parse(spec, stage.config), { ...stage.options, logLevel: vega.Warn } as ViewOptions));
  await view.runAsync();
  const out = makeConsole(view, stage, 8);

  const read = async (probe: number): Promise<void> => {
    // The returned scales are live instances the dataflow uses: we only read them.
    const x = view.scale('x');
    const y = view.scale('y');
    const color = view.scale('color');
    out.clear();
    out.push(
      `scale('x').type = ${x.type}   domain() = ${show(x.domain())}`,
      `  range() = ${show(x.range())}   bandwidth() = ${show(x.bandwidth())}   step() = ${show(x.step())}`,
      `scale('y').type = ${y.type}   domain() = ${show(y.domain())}   range() = ${show(y.range())}`,
      `  ticks(5) = ${show(y.ticks(5))}`,
      `  invert(${probe}) = ${show(y.invert(probe))}   y(50) = ${show(y(50))}`,
      `scale('color').type = ${color.type}   thresholds = ${show(color.thresholds?.())}`,
      `  color(10) = ${color(10)}   color(60) = ${color(60)}   color(95) = ${color(95)}`,
    );
    await out.show();
  };
  let w = 400;
  const resize = async (v: number): Promise<void> => {
    view.width(v);
    await view.runAsync();
    await read(75);
  };
  await read(75);
  if (stage.bar) slider(stage.bar, 'view.width()', [160, 420, 10], w, (v) => void resize((w = v)));
  if (stage.preview) stage.every(1400, (i) => resize([400, 260, 330, 200, 380][i % 5] ?? 400));
  return () => stage.dispose();
};

export default mount;
