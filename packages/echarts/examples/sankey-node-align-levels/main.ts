// Sankey nodeAlign (left, right, justify), nodeWidth, nodeGap, layoutIterations and levels by depth
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { flowLinks, flowNodes } from '../../shared/hierarchy-data.ts';

const ALIGN = ['justify', 'left', 'right'];
const DEPTH_COLOURS = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  const render = (align: string, width: number, gap: number, iterations: number): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'sankey',
          data: flowNodes,
          links: flowLinks,
          // nodeAlign: 'left' lines up the start of every branch, 'right' its end,
          // 'justify' stretches both ends to the edges (the default).
          nodeAlign: align,
          nodeWidth: width,
          nodeGap: gap,
          // layoutIterations 0 skips the crossing-reduction passes and keeps the data order.
          layoutIterations: iterations,
          draggable: !ctx.preview,
          // levels: one entry per depth (columns counted from 0) with its own colours.
          levels: DEPTH_COLOURS.map((color, depth) => ({
            depth,
            itemStyle: { color },
            lineStyle: { color: 'source', opacity: 0.4 },
          })),
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

  let align = 'justify';
  let width = 20;
  let gap = 8;
  let iterations = 32;
  render(align, width, gap, iterations);

  if (ctx.preview) {
    let i = 0;
    const stop = every(2000, () => {
      align = ALIGN[++i % ALIGN.length]!;
      render(align, width, gap, iterations);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'nodeAlign', ALIGN, (v) => {
    align = v;
    render(align, width, gap, iterations);
  });
  slider(bar!, 'nodeWidth', [6, 40, 2], width, (v) => {
    width = v;
    render(align, width, gap, iterations);
  });
  slider(bar!, 'nodeGap', [0, 30, 1], gap, (v) => {
    gap = v;
    render(align, width, gap, iterations);
  });
  const ib = button(bar!, 'layoutIterations: 32', () => {
    iterations = iterations ? 0 : 32;
    ib.textContent = `layoutIterations: ${iterations}`;
    render(align, width, gap, iterations);
  });

  return dispose;
};

export default mount;
