// createDotLayout: the resolver returns one pixel y per dot, from the plot bounds and radii
import { createDotLayout, defineChart, dot, mountChart } from '@tanstack/charts';
import { dodgeY } from '@tanstack/charts/dodge';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { groupedObservations } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = groupedObservations({ s: [50, 14, 60] }, 18).map((r, id) => ({ ...r, id }));

const rowLayout = createDotLayout({
  axis: 'y',
  anchor: 'rows',
  resolve: ({ chart, measuredPositions, radii }) =>
    measuredPositions.map((_position, index) => chart.y + radii[index]! + (index % 10) * 22),
});

const layouts = [
  [rowLayout, 'createDotLayout: ten rows by input order'],
  [dodgeY({ anchor: 'middle' }), 'dodgeY({ anchor: "middle" })'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (layout: (typeof layouts)[number][0]) =>
    defineChart({
      svgAnimation: true,
      marks: [dot(rows, { x: 'value', key: 'id', r: 5, fillOpacity: 0.75, layout })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: null },
    });

  const options = { definition: chart(layouts[0][0]), height: stage.height, initialWidth: 640, ariaLabel: 'Dots placed by a custom layout' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(layouts[i]![0]) });
    stage.say(layouts[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'layout', layouts.map((l, i) => [i, l[1]] as const), show);
    stage.say(layouts[0][1]);
  } else stage.cycle(layouts.map((_, i) => i), 2400, show);
  return () => stage.dispose();
};

export default mount;
