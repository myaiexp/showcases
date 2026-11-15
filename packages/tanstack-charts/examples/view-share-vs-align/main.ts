// shareX needs equal domains; alignX only aligns the plot edges
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { alignX, composeViews, grid, shareX } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(60).filter((r) => r.series === 'alpha');
type Link = 'same-share' | 'different-align' | 'different-share';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Link) => {
    const topDomain: [number, number] = [0, 59];
    const bottomDomain: [number, number] = mode === 'same-share' ? [0, 59] : [20, 40];
    const top = defineChart({
      marks: [areaY(series, { x: 'day', y: 'value', fill: '#64748b', fillOpacity: 0.5 })],
      scales: { x: { scale: scaleLinear().domain(topDomain) }, y: { scale: scaleLinear().domain([0, 100]), axis: false } },
      margin: { top: 4, right: 12, bottom: 24, left: 40 },
    });
    const bottom = defineChart({
      marks: [lineY(series.filter((r) => r.day >= bottomDomain[0] && r.day <= bottomDomain[1]), { x: 'day', y: 'value', stroke: '#fbbf24', strokeWidth: 2.5 })],
      scales: { x: { scale: scaleLinear().domain(bottomDomain) }, y: { scale: scaleLinear().domain([0, 100]), grid: true } },
      margin: { top: 4, right: 12, bottom: 24, left: 40 },
    });
    return composeViews({
      views: { top, bottom },
      layout: grid({
        rows: [{ id: 'top', size: 90 }, { id: 'bottom', grow: 1 }],
        columns: [{ id: 'c', grow: 1 }],
        gap: 6,
        cells: { top: { row: 'top', column: 'c' }, bottom: { row: 'bottom', column: 'c' } },
      }),
      links: [mode === 'different-align' ? alignX('top', 'bottom') : shareX('top', 'bottom')],
    });
  };

  const host = stage.own(mountChart(stage.box, { definition: build('same-share'), height: stage.height, ariaLabel: 'Two linked views' }));
  const pre = stage.preview ? null : stage.readout();
  const show = (mode: Link): void => {
    try {
      host.update({ definition: build(mode), height: stage.height, ariaLabel: 'Two linked views' });
      stage.say(mode === 'same-share' ? 'shareX, equal domains: works' : 'alignX, different domains: works, each view keeps its domain');
      if (pre) pre.textContent = 'no error';
    } catch (err) {
      stage.say('shareX with different domains: refused, the chart stays as it was');
      if (pre) pre.textContent = (err as Error).message;
    }
  };
  const modes: readonly (readonly [Link, string])[] = [['same-share', 'shareX, equal domains'], ['different-align', 'alignX, different domains'], ['different-share', 'shareX, different domains']];
  if (stage.bar) select(stage.bar, 'link', modes, show);
  show('same-share');
  if (!stage.bar) stage.cycle(modes.slice(0, 2), 2200, ([m]) => show(m));
  return () => stage.dispose();
};

export default mount;
