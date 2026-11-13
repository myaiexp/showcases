// Tree with edgeShape 'polyline' and a movable edgeForkPosition
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { project } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (shape: string, fork: number, orient: string): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'tree',
          data: [project],
          // edgeShape only applies to the orthogonal layout (the default); 'curve' is the default shape.
          layout: 'orthogonal',
          orient,
          edgeShape: shape,
          // edgeForkPosition: where a polyline edge branches, as the share of the distance
          // from the parent to its subtree. Only used when edgeShape is 'polyline'.
          edgeForkPosition: `${fork}%`,
          initialTreeDepth: ctx.preview ? 2 : -1,
          symbolSize: 8,
          lineStyle: { width: 2, color: '#7d8fa3' },
          label: { position: orient === 'TB' ? 'top' : 'left', verticalAlign: 'middle', fontSize: ctx.preview ? 10 : 12 },
          leaves: { label: { position: orient === 'TB' ? 'bottom' : 'right', verticalAlign: 'middle' } },
          top: 30,
          bottom: 30,
          left: 60,
          right: 60,
          animationDurationUpdate: ctx.preview ? 200 : 400,
        },
      ],
    });
  };

  let shape = 'polyline';
  let fork = 50;
  let orient = ctx.preview ? 'TB' : 'LR';
  render(shape, fork, orient);

  if (ctx.preview) {
    let t = 0;
    const stop = every(300, () => {
      t = (t + 1) % 24;
      fork = Math.round(50 + 45 * Math.sin((t / 24) * Math.PI * 2));
      render(shape, fork, orient);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'edgeShape', ['polyline', 'curve'], (v) => {
    shape = v;
    render(shape, fork, orient);
  });
  select(bar!, 'orient', ['LR', 'TB'], (v) => {
    orient = v;
    render(shape, fork, orient);
  });
  slider(bar!, 'edgeForkPosition %', [0, 100, 5], fork, (v) => {
    fork = v;
    render(shape, fork, orient);
  });

  return dispose;
};

export default mount;
