// Graph with fixed node positions, edgeSymbol arrows and edgeLabel placed at start, middle or end
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

// layout 'none' (the default) reads each node's x and y.
const nodes = [
  { name: 'Web', x: 0, y: 150 },
  { name: 'API', x: 200, y: 150 },
  { name: 'Auth', x: 400, y: 40 },
  { name: 'Search', x: 400, y: 150 },
  { name: 'Orders', x: 400, y: 260 },
  { name: 'DB', x: 600, y: 150 },
];
// value: requests per second; it also sets the line width below.
const edges: [string, string, number][] = [
  ['Web', 'API', 120], ['API', 'Auth', 40], ['API', 'Search', 70], ['API', 'Orders', 30],
  ['Auth', 'DB', 15], ['Search', 'DB', 55], ['Orders', 'DB', 28],
];
const ENDS = ['none', 'circle', 'arrow', 'diamond', 'rect', 'triangle'];
const POSITIONS = ['start', 'middle', 'end'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 420 });

  const render = (start: string, end: string, size: number, position: string): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'graph',
          data: nodes,
          symbolSize: 36,
          label: { show: true, position: 'inside', fontSize: 11 },
          // edgeSymbol: [symbol at the source end, symbol at the target end].
          edgeSymbol: [start, end],
          // edgeSymbolSize: one size, or [source size, target size].
          edgeSymbolSize: [size * 0.6, size],
          // edgeLabel: a label on every edge. {c} is the link value.
          edgeLabel: { show: true, position, formatter: '{c}/s', fontSize: 11 },
          links: edges.map(([source, target, value]) => ({
            source,
            target,
            value,
            lineStyle: { width: 1 + value / 25, curveness: 0.1 },
          })),
          lineStyle: { opacity: 0.7 },
          left: 30,
          right: 30,
          animationDurationUpdate: 500,
        },
      ],
    });
  };

  let start = 'circle';
  let end = 'arrow';
  let size = 12;
  let position = 'middle';
  render(start, end, size, position);

  if (ctx.preview) {
    let i = 0;
    const stop = every(1800, () => {
      i++;
      position = POSITIONS[i % 3]!;
      end = ENDS[1 + (i % (ENDS.length - 1))]!;
      render(start, end, size, position);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'edgeSymbol[0]', ENDS, (v) => {
    start = v;
    render(start, end, size, position);
  }).value = start;
  select(bar!, 'edgeSymbol[1]', ENDS, (v) => {
    end = v;
    render(start, end, size, position);
  }).value = end;
  select(bar!, 'edgeLabel.position', POSITIONS, (v) => {
    position = v;
    render(start, end, size, position);
  }).value = position;
  slider(bar!, 'edgeSymbolSize', [4, 24, 1], size, (v) => {
    size = v;
    render(start, end, size, position);
  });

  return dispose;
};

export default mount;
