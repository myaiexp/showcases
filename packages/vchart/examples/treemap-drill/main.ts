// Treemap drill: click a parent to open it, plus the 'drill' event and drillDown/drillUp from code
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { asSpec, moduleTree, pathOf } from '../../shared/hierarchy-data.ts';

interface Drillable {
  drillDown(path: string[]): string[];
  drillUp(): string[];
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, asSpec({
    type: 'treemap',
    categoryField: 'name',
    valueField: 'value',
    label: { visible: true, style: { fontSize: ctx.preview ? 9 : 11 } },
    tooltip: { mark: { title: { value: pathOf } } },
    data: [{ id: 'data', values: moduleTree() }],
    // The drill key: names are unique in this tree, so the name is the path element.
    drill: true,
    drillField: 'name',
    nonLeaf: { visible: true },
    nonLeafLabel: { visible: true, position: 'top', padding: 20, style: { fontSize: 11, fill: '#fff' } },
  }), { previewHeight: 200 });
  const out = ctx.preview ? null : readout(el);
  if (out) out.textContent = 'Click a rectangle to drill down; click it again to drill up.';

  vchart.on('drill', (e) => {
    const v = (e as { value: { type: string; path: string[] } }).value;
    if (out) out.textContent = `${v.type}: ${v.path.join(' > ') || '(root)'}`;
  });

  const series = (): Drillable | undefined => (vchart.getChart()?.getAllSeries()[0] as unknown as Drillable | undefined);
  if (bar) {
    button(bar, 'drillDown(["util"])', () => series()?.drillDown(['util']));
    button(bar, 'drillDown(["util","math"])', () => series()?.drillDown(['util', 'math']));
    button(bar, 'drillUp()', () => series()?.drillUp());
  }

  // Card: open util, then util > palette, then back out, forever.
  const script = [['util'], ['util', 'palette'], [], ['animate'], []];
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
