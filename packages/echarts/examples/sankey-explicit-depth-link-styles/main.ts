// Sankey with data.depth overrides plus per-node and per-link styles
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { flowLinks, flowNodes } from '../../shared/hierarchy-data.ts';

interface Overrides { depth: boolean; links: boolean; nodes: boolean }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  const render = (o: Overrides): void => {
    const data = flowNodes.map((n) => {
      const item: Record<string, unknown> = { name: n.name };
      // depth: put the node in this column (counted from 0) whatever its links say.
      if (o.depth && (n.name === 'Rent' || n.name === 'Transport')) item.depth = 3;
      // A node can carry its own itemStyle and label, which beat the series values.
      if (o.nodes && n.name === 'Pension') {
        item.itemStyle = { color: '#ee6666', borderColor: '#fff', borderWidth: 2 };
        item.label = { color: '#ee6666', fontWeight: 'bold' };
      }
      return item;
    });
    const links = flowLinks.map((l) =>
      o.links && l.source === 'Freelance'
        ? {
            ...l,
            // A link's own lineStyle and emphasis.lineStyle beat the series-level ones.
            lineStyle: { color: '#fac858', opacity: 0.7 },
            emphasis: { lineStyle: { color: '#ff9f1c', opacity: 1 } },
          }
        : l,
    );
    chart.setOption(
      {
        tooltip: {},
        series: [
          {
            type: 'sankey',
            data,
            links,
            lineStyle: { color: 'gradient', opacity: 0.4 },
            draggable: false,
            label: { show: !ctx.preview, fontSize: 11 },
            emphasis: { focus: 'adjacency' },
            left: 20,
            right: 90,
            top: 16,
            bottom: 16,
            animationDurationUpdate: 600,
          },
        ],
      },
      true,
    );
  };

  const o: Overrides = { depth: true, links: true, nodes: true };
  render(o);

  if (ctx.preview) {
    let i = 0;
    const stop = every(1800, () => {
      i++;
      o.depth = i % 2 === 1 ? false : true;
      o.links = i % 3 !== 0;
      render(o);
    });
    return () => {
      stop();
      dispose();
    };
  }

  const toggle = (key: keyof Overrides, label: string): void => {
    const b = button(bar!, `${label}: on`, () => {
      o[key] = !o[key];
      b.textContent = `${label}: ${o[key] ? 'on' : 'off'}`;
      render(o);
    });
  };
  toggle('depth', 'data.depth (Rent, Transport)');
  toggle('links', 'links.lineStyle (Freelance)');
  toggle('nodes', 'data.itemStyle and label (Pension)');

  return dispose;
};

export default mount;
