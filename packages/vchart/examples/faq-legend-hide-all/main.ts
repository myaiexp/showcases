// FAQ: start with every legend item unselected, and a button to hide all or show all
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const GROUPS = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const values = GROUPS.flatMap((c, i) => walk(8, 10 + i, c));

const build = (hideAll: boolean): ISpec => {
  const spec: ISpec = {
    type: 'line',
    data: [{ id: 'd', values }],
    xField: 'x',
    yField: 'y',
    seriesField: 'c',
    legends: { visible: true, orient: 'top' },
  };
  // An empty defaultSelected means "nothing selected"; leaving it out means everything is.
  if (hideAll) (spec.legends as { defaultSelected?: string[] }).defaultSelected = [];
  return spec;
};

const mount: Mount = (el, ctx) => {
  let chart = createChart(el, ctx, build(true));
  const rebuild = (hideAll: boolean): void => {
    chart.release();
    chart = createChart(el, ctx, build(hideAll));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    button(bar, 'Hide all', () => rebuild(true));
    button(bar, 'Show all', () => rebuild(false));
    const hint = document.createElement('span');
    hint.textContent = 'Click a legend item to bring a single line back.';
    bar.append(hint);
  }
  let i = 0;
  const stop = every(2200, () => {
    i += 1;
    rebuild(pick([true, false], i));
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
