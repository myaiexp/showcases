// Graph force layout: gravity, friction, edgeLength ranges from link values, initLayout and a fixed node
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { collaborations, people } from '../../shared/hierarchy-data.ts';

interface Params { gravity: number; friction: number; ranged: boolean; initLayout: string; pinned: boolean }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (p: Params): void => {
    // notMerge (the second argument) rebuilds the series, which restarts the simulation.
    chart.setOption(
      {
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              // gravity pulls every node toward the centre.
              gravity: p.gravity,
              // friction slows node movement (experimental, per the docs): 1 stops them quickly.
              friction: p.friction,
              repulsion: 90,
              // As an array, edgeLength is a range: links with a larger value come out
              // shorter, links with a smaller value longer.
              edgeLength: p.ranged ? [20, 120] : 50,
              // initLayout 'circular' starts from a ring instead of random positions.
              initLayout: p.initLayout === 'circular' ? 'circular' : undefined,
              layoutAnimation: true,
            },
            symbolSize: 18,
            label: { show: !ctx.preview, position: 'right', fontSize: 11 },
            // fixed: true keeps a node at its x and y while the others settle around it.
            data: people.map((n, i) => (i === 0 && p.pinned ? { name: n.name, x: 80, y: 80, fixed: true, symbolSize: 28 } : { name: n.name })),
            links: collaborations.map(([source, target], i) => ({ source, target, value: 1 + (i % 5) })),
            lineStyle: { opacity: 0.5 },
          },
        ],
      },
      true,
    );
  };

  const p: Params = { gravity: 0.1, friction: 0.6, ranged: false, initLayout: 'none', pinned: false };
  render(p);

  if (ctx.preview) {
    let on = false;
    const stop = every(3000, () => {
      on = !on;
      p.gravity = on ? 0.6 : 0.02;
      p.ranged = on;
      render(p);
    });
    return () => {
      stop();
      dispose();
    };
  }

  slider(bar!, 'gravity', [0, 1, 0.02], p.gravity, (v) => { p.gravity = v; render(p); });
  slider(bar!, 'friction', [0, 1, 0.05], p.friction, (v) => { p.friction = v; render(p); });
  select(bar!, 'initLayout', ['none', 'circular'], (v) => { p.initLayout = v; render(p); });
  const rb = button(bar!, 'edgeLength: 50', () => {
    p.ranged = !p.ranged;
    rb.textContent = p.ranged ? 'edgeLength: [20, 120]' : 'edgeLength: 50';
    render(p);
  });
  const pb = button(bar!, 'pin first node: off', () => {
    p.pinned = !p.pinned;
    pb.textContent = `pin first node: ${p.pinned ? 'on' : 'off'}`;
    render(p);
  });
  button(bar!, 'restart', () => render(p));

  return dispose;
};

export default mount;
