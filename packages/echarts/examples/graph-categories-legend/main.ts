// Graph nodes grouped by categories with their own symbol and label, hidden through the legend
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { TEAMS, collaborations, people } from '../../shared/hierarchy-data.ts';

const SYMBOLS = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (firstSymbol: string, labels: boolean): void => {
    chart.setOption({
      tooltip: {},
      // A legend entry per category name; clicking one hides that category's nodes.
      legend: { data: TEAMS.slice(), show: !ctx.preview },
      series: [
        {
          type: 'graph',
          layout: 'force',
          force: { repulsion: 140, edgeLength: 45, gravity: 0.1 },
          // categories: style shared by nodes with the same data[i].category index.
          // The category name must match the legend entry.
          categories: TEAMS.map((name, i) => ({
            name,
            symbol: i === 0 ? firstSymbol : i === 1 ? 'roundRect' : 'diamond',
            itemStyle: { borderColor: '#fff', borderWidth: 1 },
            label: { show: labels, position: 'right', fontSize: 11 },
          })),
          symbolSize: 20,
          data: people.map((p) => ({ name: p.name, category: p.team })),
          links: collaborations.map(([source, target]) => ({ source, target })),
          lineStyle: { opacity: 0.4 },
          roam: !ctx.preview,
          draggable: !ctx.preview,
        },
      ],
    });
  };

  let symbol = 'circle';
  let labels = true;
  render(symbol, labels);

  if (ctx.preview) {
    // No pointer here, so hide and show categories through the legend actions.
    let i = 0;
    const stop = every(1600, () => {
      chart.dispatchAction({ type: 'legendToggleSelect', name: TEAMS[i++ % TEAMS.length]! });
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'first category symbol', SYMBOLS, (v) => {
    symbol = v;
    render(symbol, labels);
  });
  const lb = button(bar!, 'category labels: on', () => {
    labels = !labels;
    lb.textContent = `category labels: ${labels ? 'on' : 'off'}`;
    render(symbol, labels);
  });

  return dispose;
};

export default mount;
