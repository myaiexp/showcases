// Focus and context: the viewport lives in app state and both children read it as data
import { areaY, defineChart, lineY, mountChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { alignX, composeViews, grid } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(120).filter((r) => r.series === 'alpha');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const view = { start: 30, length: 40 };

  const build = () => {
    const overviewDefinition = defineChart({
      marks: [
        rect([{ a: view.start, b: view.start + view.length }], { x1: 'a', x2: 'b', y1: () => 0, y2: () => 100, fill: '#fbbf24', fillOpacity: 0.25 }),
        areaY(series, { x: 'day', y: 'value', fill: '#64748b', fillOpacity: 0.5 }),
      ],
      scales: { x: { scale: scaleLinear().domain([0, 119]), axis: false }, y: { scale: scaleLinear().domain([0, 100]), axis: false } },
      margin: { top: 4, right: 12, bottom: 4, left: 44 },
    });
    const detailDefinition = defineChart({
      marks: [lineY(series.filter((r) => r.day >= view.start && r.day <= view.start + view.length), { x: 'day', y: 'value', stroke: '#fbbf24', strokeWidth: 2.5, points: true })],
      scales: {
        x: { scale: scaleLinear().domain([view.start, view.start + view.length]) },
        y: { scale: scaleLinear().domain([0, 100]), grid: true },
      },
      margin: { top: 8, right: 12, bottom: 28, left: 44 },
    });
    return composeViews({
      views: { overview: overviewDefinition, detail: detailDefinition },
      layout: grid({
        rows: [{ id: 'overview', size: 64 }, { id: 'detail', grow: 1 }],
        columns: [{ id: 'main', grow: 1 }],
        gap: 6,
        cells: { overview: { row: 'overview', column: 'main' }, detail: { row: 'detail', column: 'main' } },
      }),
      links: [alignX('overview', 'detail')],
    });
  };
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Overview and detail of a series' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`detail domain: day ${view.start} to ${view.start + view.length}`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'start', 0, 100, 1, view.start, (v) => { view.start = Math.min(v, 119 - view.length); refresh(); });
    slider(stage.bar, 'length', 10, 80, 1, view.length, (v) => { view.length = v; view.start = Math.min(view.start, 119 - v); refresh(); });
  } else {
    stage.every(120, () => {
      view.start = 10 + Math.round(50 * (0.5 + 0.5 * Math.sin(performance.now() / 1600)));
      host.update(options());
    });
  }
  return () => stage.dispose();
};

export default mount;
