// Sunburst drill: click an arc to open its subtree, plus drillDown/drillUp from code
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { asSpec, pathOf, salesTree } from '../../shared/hierarchy-data.ts';

interface Drillable {
  drillDown(path: string[]): string[];
  drillUp(): string[];
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  // Region and product names are unique, so 'name' works as the drill key.
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'sunburst',
    data: [{ id: 'data', values: salesTree() }],
    categoryField: 'name',
    valueField: 'value',
    outerRadius: 0.95,
    sunburst: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.45 : 0.85) } },
    // Cards are too small for arc labels.
    label: { visible: !ctx.preview, style: { fontSize: 11 } },
    tooltip: { mark: { title: { value: pathOf } } },
    drill: true,
    drillField: 'name',
  }));
  const out = ctx.preview ? null : readout(el);
  if (out) out.textContent = 'Click an arc to drill down; click again to drill up.';

  vchart.on('drill', (e) => {
    const v = (e as { value: { type: string; path: string[] } }).value;
    if (out) out.textContent = `${v.type}: ${v.path.join(' > ') || '(root)'}`;
  });

  const series = (): Drillable | undefined => vchart.getChart()?.getAllSeries()[0] as unknown as Drillable | undefined;
  if (bar) {
    button(bar, 'drillDown Country A', () => series()?.drillDown(['Country A']));
    button(bar, 'drillDown Country B > B2', () => series()?.drillDown(['Country B', 'B2']));
    button(bar, 'drillUp()', () => series()?.drillUp());
  }

  const script = [['Country A'], ['Country A', 'A2'], [], ['Country B'], []];
  let i = 0;
  const stop = ctx.preview
    ? every(1800, () => {
        const path = script[i++ % script.length] as string[];
        if (path.length) series()?.drillDown(path);
        else {
          series()?.drillUp();
          series()?.drillUp();
        }
      })
    : () => {};

  return () => {
    stop();
    release();
  };
};

export default mount;
