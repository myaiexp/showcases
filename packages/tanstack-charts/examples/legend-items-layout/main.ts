// colorLegendItems: justify start, center or stretch, with gap and rowGap
import { barY, colorLegend, colorLegendItems, defineChart, group, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { regionRows } from '../../shared/style-regions.ts';
import { breathe } from '../../shared/style-box.ts';
import { createStage } from '../../shared/stage.ts';

type Justify = 'start' | 'center' | 'stretch';
const modes: readonly Justify[] = ['start', 'center', 'stretch'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Narrow the box: compact rows wrap, stretched columns do not shrink below itemWidth.' });
  let justify: Justify = 'center';
  let gap = 18;
  const build = () =>
    defineChart({
      marks: [barY(regionRows, { x: 'quarter', y: 'sales', color: 'region', layout: group() })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { legend: colorLegend({ placement: 'bottom', items: colorLegendItems({ justify, gap, rowGap: 6 }) }) },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Sales by region and quarter' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    select(stage.bar, 'justify', modes.map((m) => [m, m] as const), (v) => { justify = v; refresh(); }, justify);
    slider(stage.bar, 'gap', 4, 40, 2, gap, (v) => { gap = v; refresh(); }, (v) => `${v}px`);
    slider(stage.bar, 'width', 35, 100, 1, 100, (v) => { stage.box.style.width = `${v}%`; }, (v) => `${v}%`);
  } else {
    breathe(stage, 45, 100, 6000);
    stage.cycle(modes, 2000, (m) => { justify = m; refresh(); stage.say(`justify: ${m}`); });
  }
  return () => stage.dispose();
};

export default mount;
