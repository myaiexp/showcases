// FAQ: in a combination chart the later series draws on top, so declare the line after the area
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const MODES = ['area first, line second', 'line first, area second'] as const;
const values = walk(10, 6);

const build = (mode: string): ISpec => {
  const area = { type: 'area', id: 'area', dataIndex: 0, xField: 'x', yField: 'y', point: { visible: false }, area: { style: { fillOpacity: 0.55 } } };
  const line = { type: 'line', id: 'line', dataIndex: 0, xField: 'x', yField: 'y', point: { visible: true, style: { size: 12, fill: '#fff', stroke: '#f97316', lineWidth: 2 } }, line: { style: { stroke: '#f97316', lineWidth: 3 } } };
  return {
    type: 'common',
    data: [{ id: 'd', values }],
    // The order of this array is the stacking order of the marks: later entries are drawn above earlier ones.
    series: mode === MODES[0] ? [area, line] : [line, area],
    axes: [{ orient: 'left' }, { orient: 'bottom', type: 'band' }],
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) => {
  let chart = createChart(el, ctx, build(MODES[0]));
  // The series array is reordered, so a fresh chart is the reliable way to show it.
  const rebuild = (mode: string): void => {
    chart.release();
    chart = createChart(el, ctx, build(mode));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'declaration order', MODES, rebuild);
  }
  let i = 0;
  const stop = every(2000, () => {
    i += 1;
    if (ctx.preview) rebuild(pick(MODES, i));
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
