// Sankey ribbons: lineStyle color (source, target, gradient, fixed), curveness, opacity and edgeLabel
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { flowLinks, flowNodes } from '../../shared/hierarchy-data.ts';

const COLOURS = ['gradient', 'source', 'target', '#8899aa'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  const render = (color: string, curveness: number, opacity: number, labels: boolean): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'sankey',
          data: flowNodes,
          links: flowLinks,
          draggable: false,
          // lineStyle.color: 'source' / 'target' take that node's colour, 'gradient'
          // blends the two, anything else is a fixed colour.
          lineStyle: { color, curveness, opacity },
          // edgeLabel: a label on each ribbon; {c} is the link value.
          edgeLabel: { show: labels && !ctx.preview, formatter: '{c}', fontSize: 10, color: '#fff' },
          itemStyle: { borderRadius: 3 },
          label: { show: !ctx.preview, fontSize: 11 },
          left: 20,
          right: 90,
          top: 16,
          bottom: 16,
          animationDurationUpdate: 600,
        },
      ],
    });
  };

  let color = 'gradient';
  let curveness = 0.5;
  let opacity = 0.45;
  let labels = true;
  render(color, curveness, opacity, labels);

  if (ctx.preview) {
    let i = 0;
    const stop = every(1800, () => {
      i++;
      color = COLOURS[i % COLOURS.length]!;
      curveness = i % 2 ? 0.2 : 0.7;
      render(color, curveness, opacity, labels);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'lineStyle.color', COLOURS, (v) => {
    color = v;
    render(color, curveness, opacity, labels);
  });
  slider(bar!, 'curveness', [0, 1, 0.05], curveness, (v) => {
    curveness = v;
    render(color, curveness, opacity, labels);
  });
  slider(bar!, 'opacity', [0.1, 1, 0.05], opacity, (v) => {
    opacity = v;
    render(color, curveness, opacity, labels);
  });
  const lb = button(bar!, 'edgeLabel: on', () => {
    labels = !labels;
    lb.textContent = `edgeLabel: ${labels ? 'on' : 'off'}`;
    render(color, curveness, opacity, labels);
  });

  return dispose;
};

export default mount;
