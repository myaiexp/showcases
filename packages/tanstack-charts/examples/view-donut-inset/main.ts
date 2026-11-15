// composeViews with layer(fill, inset): a donut drawn over a scatter, anchored to a corner
import { defineChart, dot } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { composeViews, fill, inset, layer } from '@tanstack/charts/view';
import type { ViewAnchor } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { makeDots } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const dots = makeDots(120);
const summaryRows = [{ status: 'Complete', count: 72 }, { status: 'Remaining', count: 28 }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const scatterDefinition = defineChart({
    marks: [dot(dots, { x: 'x', y: 'y', color: 'group', r: 3.5 })],
    scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
  });
  const slices = pie(summaryRows, { value: 'count' });
  const summaryDefinition = defineChart({
    marks: [polar({ inset: 8, marks: [radialArc(slices, { innerRadius: ({ radius }) => radius * 0.58, color: 'status', key: 'status' })], scales: { angle: null, radius: null } })],
    scales: { x: null, y: null },
    guides: false,
    margin: 0,
  });

  const build = (anchor: ViewAnchor) =>
    composeViews({
      views: { detail: scatterDefinition, summary: summaryDefinition },
      layout: layer(fill('detail'), inset('summary', { relativeTo: 'detail', anchor, width: 120, height: 120, offset: 12 })),
    });
  const states = (['top-right', 'bottom-left', 'center'] as const).map((a) => [a, `anchor: '${a}'`] as const);
  lab(stage, { label: 'anchor', ariaLabel: 'Scatter plot with a donut summary', states, build, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
