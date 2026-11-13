// Graph series laid out on a cartesian grid: node value is [x, y], axes come from xAxis and yAxis
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, slider } from '../../shared/chart.ts';

// Tasks placed by effort (x) and impact (y); links are "blocks" relations.
const tasks = ['Login', 'Search', 'Export', 'Billing', 'Themes', 'API', 'Mobile', 'Audit'];
const blocks: [string, string][] = [
  ['Login', 'Billing'], ['Login', 'Mobile'], ['API', 'Mobile'], ['API', 'Export'],
  ['Search', 'Export'], ['Billing', 'Audit'], ['Themes', 'Mobile'],
];
const start: [number, number][] = [[2, 7], [4, 6], [5, 3], [7, 8], [3, 2], [6, 6], [9, 9], [8, 4]];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  let positions = start.map((p) => [...p]);
  let curveness = 0.2;
  let showLinks = true;

  const render = (): void => {
    chart.setOption({
      tooltip: {},
      grid: { top: 30, left: 50, right: 30, bottom: 60 },
      xAxis: { type: 'value', name: 'effort', min: 0, max: 10 },
      yAxis: { type: 'value', name: 'impact', min: 0, max: 10 },
      series: [
        {
          type: 'graph',
          // coordinateSystem: 'cartesian2d' puts each node at its value [x, y] on the
          // xAxis and yAxis, instead of running a layout of its own.
          coordinateSystem: 'cartesian2d',
          symbolSize: 26,
          label: { show: true, position: 'bottom', fontSize: 11 },
          data: tasks.map((name, i) => ({ name, value: positions[i] })),
          links: showLinks ? blocks.map(([source, target]) => ({ source, target })) : [],
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: 8,
          lineStyle: { curveness, opacity: 0.7, width: 2 },
          animationDurationUpdate: 700,
        },
      ],
    });
  };
  const shuffle = (): void => {
    positions = tasks.map(() => [1 + Math.round(Math.random() * 80) / 10, 1 + Math.round(Math.random() * 80) / 10]);
    render();
  };
  render();

  if (ctx.preview) {
    const stop = every(2200, shuffle);
    return () => {
      stop();
      dispose();
    };
  }

  button(bar!, 'new positions', shuffle);
  const lb = button(bar!, 'links: on', () => {
    showLinks = !showLinks;
    lb.textContent = `links: ${showLinks ? 'on' : 'off'}`;
    render();
  });
  slider(bar!, 'curveness', [0, 1, 0.05], curveness, (v) => {
    curveness = v;
    render();
  });

  return dispose;
};

export default mount;
