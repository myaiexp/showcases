// A custom measureText: the solver trusts your metrics, so margins and tick thinning follow them
import { barX, defineChart, mountChart } from '@tanstack/charts';
import type { ChartTextMeasurer } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { features } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

/** Estimates width from the character count; `scale` stretches every glyph. */
const estimator =
  (scale: number): ChartTextMeasurer =>
  (text, { fontSize, anchor, baseline, fontScale }) => {
    const width = text.length * fontSize * 0.55 * scale * fontScale;
    const height = fontSize * fontScale;
    const x = anchor === 'middle' ? -width / 2 : anchor === 'end' ? -width : 0;
    const y = baseline === 'middle' ? -height / 2 : baseline === 'hanging' ? 0 : -height * 0.8;
    return { x, y, width, height };
  };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Stretch the estimated glyph width: the left margin grows with it.' });
  const definition = defineChart({
    marks: [barX(features, { x: 'weeklyRequests', y: 'feature', fill: '#34d399', inset: 1 })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true },
      y: { scale: () => scaleBand<string>().padding(0.1) },
    },
  });
  const options = (scale: number) => ({
    definition,
    height: stage.height,
    ariaLabel: 'Feature requests per week',
    measureText: estimator(scale),
    onRender: ({ scene }: { scene: { margin: { left: number } } }) => stage.say(`glyph width x${scale.toFixed(1)}: left margin ${Math.round(scene.margin.left)}px`),
  });
  const host = stage.own(mountChart(stage.box, options(1)));
  if (stage.bar) slider(stage.bar, 'glyph width', 0.6, 2, 0.1, 1, (v) => host.update(options(v)), (v) => `x${v.toFixed(1)}`);
  else stage.cycle([0.8, 1.3], 2200, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;
