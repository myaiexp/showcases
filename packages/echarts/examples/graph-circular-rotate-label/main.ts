// Graph with layout 'circular': toggle circular.rotateLabel, label position and node size
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { collaborations, people } from '../../shared/hierarchy-data.ts';

const degree = (name: string): number => collaborations.filter(([a, b]) => a === name || b === name).length;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (rotate: boolean, position: string, size: number): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'graph',
          // layout 'circular' puts the nodes on a circle in data order; no x/y needed.
          layout: 'circular',
          // circular.rotateLabel turns each label to follow its radius.
          circular: { rotateLabel: rotate },
          // Bigger nodes for people with more collaborations.
          data: people.map((p) => ({ name: p.name, symbolSize: size + degree(p.name) * 2 })),
          links: collaborations.map(([source, target]) => ({ source, target })),
          label: { show: true, position, fontSize: ctx.preview ? 10 : 12 },
          lineStyle: { color: 'source', curveness: 0.3, opacity: 0.6 },
          // Keep the ring inside the canvas so the rotated labels have room.
          top: 40,
          bottom: 40,
          animationDurationUpdate: 600,
        },
      ],
    });
  };

  let rotate = true;
  let position = 'right';
  let size = 10;
  render(rotate, position, size);

  if (ctx.preview) {
    const stop = every(2000, () => {
      rotate = !rotate;
      render(rotate, position, size);
    });
    return () => {
      stop();
      dispose();
    };
  }

  const rb = button(bar!, 'rotateLabel: on', () => {
    rotate = !rotate;
    rb.textContent = `rotateLabel: ${rotate ? 'on' : 'off'}`;
    render(rotate, position, size);
  });
  select(bar!, 'label.position', ['right', 'left', 'top', 'bottom'], (v) => {
    position = v;
    render(rotate, position, size);
  });
  slider(bar!, 'base symbolSize', [4, 24, 1], size, (v) => {
    size = v;
    render(rotate, position, size);
  });

  return dispose;
};

export default mount;
