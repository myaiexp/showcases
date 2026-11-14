// extensionMark syncState: dots and labels over the bars take the bars' hover and select states
import type { Mount } from '@/types.ts';
import { registerExtensionMarkSyncStatePlugin } from '@visactor/vchart-extension';
import { button, controlBar, createChart, every, type ISpec } from '../../shared/chart.ts';

registerExtensionMarkSyncStatePlugin();

const values = [
  { category: 'A', value: 80, group: 'February' },
  { category: 'B', value: 120, group: 'February' },
  { category: 'C', value: 60, group: 'February' },
  { category: 'D', value: 150, group: 'February' },
  { category: 'A', value: 90, group: 'March' },
  { category: 'B', value: 100, group: 'March' },
  { category: 'C', value: 110, group: 'March' },
  { category: 'D', value: 70, group: 'March' },
];

// Where a bar's extension marks sit: over the bar's centre, March's bar to the right of February's.
const cx = (d: { category: string; group: string }, ctx: { valueToX: (v: string[]) => number; xBandwidth: () => number }): number =>
  ctx.valueToX([d.category]) + ctx.xBandwidth() / 4 + (d.group === 'March' ? ctx.xBandwidth() / 2 : 0);

const mount: Mount = (el, ctx) => {
  type D = { category: string; group: string; value: number };
  type C = Parameters<typeof cx>[1] & { valueToY: (v: number[]) => number };
  const spec = {
    type: 'bar',
    data: [{ id: 'barData', values }],
    // Two fields on xField group the bars side by side within each category.
    xField: ['category', 'group'],
    yField: 'value',
    seriesField: 'group',
    bar: {
      state: {
        highlight: { stroke: '#fff', lineWidth: 2 },
        blur: { fillOpacity: 0.25 },
        selected: { stroke: '#f6bd16', lineWidth: 3 },
      },
    },
    extensionMark: [
      {
        type: 'symbol',
        dataId: 'barData',
        name: 'topDot',
        syncState: true,
        style: {
          fill: (d: D) => (d.group === 'February' ? '#1664FF' : '#1AC6FF'),
          symbolType: 'circle',
          size: 12,
          x: (d: D, c: C) => cx(d, c),
          y: (d: D, c: C) => c.valueToY([d.value]) - 15,
        },
        state: {
          highlight: { fill: 'orange', size: 20, stroke: '#fff', lineWidth: 2 },
          blur: { fillOpacity: 0.15, size: 8 },
          selected: { fill: '#f6bd16', size: 22 },
        },
      },
      {
        type: 'text',
        dataId: 'barData',
        name: 'topLabel',
        syncState: true,
        style: {
          text: (d: D) => `${d.value}`,
          fontSize: 11,
          fill: '#d0d4dc',
          textAlign: 'center',
          textBaseline: 'bottom',
          x: (d: D, c: C) => cx(d, c),
          y: (d: D, c: C) => c.valueToY([d.value]) - 26,
        },
        state: {
          highlight: { fill: 'orange', fontSize: 16, fontWeight: 'bold' },
          blur: { fillOpacity: 0.1 },
          selected: { fill: '#f6bd16', fontSize: 14, fontWeight: 'bold' },
        },
      },
    ],
    interaction: { hover: { enable: true }, select: { enable: true } },
    legends: { visible: !ctx.preview, orient: 'top' },
  } as unknown as ISpec;
  // The control bar goes in before the chart so it sits above it.
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, spec);

  // The same states a pointer would set, from code: hover or select one datum, or clear.
  const targets = values.slice(0, 8);
  let i = 0;
  const setHover = (j: number): void => vchart.setHovered(targets[j] as D);
  const stop = !bar
    ? every(1300, () => {
        i += 1;
        if (i % 4 === 0) vchart.setHovered(null);
        else if (i % 4 === 2) vchart.setSelected(targets[i % 8] as D);
        else setHover(i % 8);
      })
    : (() => {
        button(bar, 'Hover next bar', () => setHover(i++ % 8));
        button(bar, 'Select next bar', () => vchart.setSelected(targets[i++ % 8] as D));
        button(bar, 'Clear', () => {
          vchart.setSelected(null);
          vchart.setHovered(null);
        });
        return (): void => {};
      })();

  return () => {
    stop();
    release();
  };
};

export default mount;
