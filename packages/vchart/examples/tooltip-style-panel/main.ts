// Tooltip theme through tooltip.style: panel, shape, title / key / value labels
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const STYLES = {
  glow: {
    panel: {
      backgroundColor: 'rgba(24,144,255,0.12)',
      border: { color: '#6690F2', width: 2, radius: 6 },
      shadow: { x: 0, y: 0, blur: 10, spread: 2, color: '#6690F2' },
    },
    titleLabel: { fontColor: '#93c5fd', fontWeight: 'bold' },
    keyLabel: { fontColor: '#e2e8f0' },
    valueLabel: { fontColor: '#fde68a', fontWeight: 'bold' },
    shape: { size: 12 },
  },
  paper: {
    panel: { backgroundColor: '#fafaf9', border: { color: '#a8a29e', width: 1, radius: 0 }, shadow: { x: 3, y: 3, blur: 0, spread: 0, color: '#57534e' } },
    titleLabel: { fontColor: '#1c1917', fontSize: 15, fontWeight: 'bold' },
    keyLabel: { fontColor: '#44403c' },
    valueLabel: { fontColor: '#b91c1c', fontWeight: 'bold' },
    shape: { size: 8, spacing: 14 },
    spaceRow: 10,
  },
} as const;

const build = (style: keyof typeof STYLES): ISpec => ({
  type: 'line',
  data: [{ id: 'trend', values: groupedRows(QUARTERS, ['North', 'South', 'East'], 8) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: true, orient: 'top' },
  tooltip: { style: STYLES[style] },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('glow'));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1100, () => {
      i += 1;
      if (i % 12 === 0 && !released) void vchart.updateSpec(build(i % 24 === 0 ? 'glow' : 'paper'));
      vchart.setDimensionIndex(pick(QUARTERS, i));
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'style', Object.keys(STYLES), (v) => {
      if (!released) void vchart.updateSpec(build(v as keyof typeof STYLES));
    });
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
