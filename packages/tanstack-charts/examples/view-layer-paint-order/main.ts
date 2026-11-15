// layer(fill(a), fill(b)): b paints over a; reversing the list reverses the occlusion
import { barY, defineChart, lineY } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { composeViews, fill, layer } from '@tanstack/charts/view';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const totals = ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => ({ q, total: quarters.filter((r) => r.quarter === q).reduce((s, r) => s + r.revenue, 0), target: 85 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const scales = { x: { scale: () => scaleBand<string>().padding(0.3) }, y: { scale: scaleLinear().domain([0, 120]), grid: true } };
  const bars = defineChart({ marks: [barY(totals, { x: 'q', y: 'total', fill: '#60a5fa' })], scales, margin: 28 });
  const target = defineChart({ marks: [lineY(totals, { x: 'q', y: 'target', stroke: '#f87171', strokeWidth: 6 })], scales, margin: 28 });

  const build = (barsFirst: boolean) =>
    composeViews({
      views: { bars, target },
      layout: barsFirst ? layer(fill('bars'), fill('target')) : layer(fill('target'), fill('bars')),
    });
  const states = [[true, 'bars first: the target line paints over them'], [false, 'target first: the bars paint over the line']] as const;
  lab(stage, { label: 'order', ariaLabel: 'Two layered views', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
