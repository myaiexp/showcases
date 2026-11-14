// Circle packing drill: open a circle to see its children, plus drillDown/drillUp from code
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { asSpec, packingBase } from '../../shared/hierarchy-data.ts';

interface Drillable {
  drillDown(path: string[]): string[];
  drillUp(): string[];
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, asSpec({ ...packingBase(ctx.preview), drill: true, drillField: 'name', layoutPadding: [0, 10, 10] }));
  const out = ctx.preview ? null : readout(el);
  if (out) out.textContent = 'Click a circle to drill down; click it again to drill up.';

  vchart.on('drill', (e) => {
    const v = (e as { value: { type: string; path: string[] } }).value;
    if (out) out.textContent = `${v.type}: ${v.path.join(' > ') || '(root)'}`;
  });

  const series = (): Drillable | undefined => vchart.getChart()?.getAllSeries()[0] as unknown as Drillable | undefined;
  if (bar) {
    button(bar, 'drillDown Country A', () => series()?.drillDown(['All sales', 'Country A']));
    button(bar, 'drillDown Country B > B1', () => series()?.drillDown(['All sales', 'Country B', 'B1']));
    button(bar, 'drillUp()', () => series()?.drillUp());
  }

  const script = [['All sales', 'Country A'], ['All sales', 'Country A', 'A3'], [], ['All sales', 'Country B'], []];
  let i = 0;
  const stop = ctx.preview
    ? every(1800, () => {
        const path = script[i++ % script.length] as string[];
        if (path.length) series()?.drillDown(path);
        else {
          series()?.drillUp();
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
