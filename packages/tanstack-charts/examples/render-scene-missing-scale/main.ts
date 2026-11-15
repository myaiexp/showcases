// Scene compilation errors are synchronous: a channel without a scale is reported at once
import { createChartScene, defineChart, lineY, renderChartSvg } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'x is a positional channel of the line mark; null removes its scale.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  const marks = [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 })];

  const show = (withScale: boolean): void => {
    try {
      const definition = withScale
        ? defineChart({ marks, scales: { x: { scale: () => scalePoint<string>().padding(0.3) }, y: { scale: scaleLinear, nice: true, grid: true } } })
        : // The types accept a null scale, so only the compiler can tell it is wrong here.
          defineChart({ marks, scales: { x: null, y: { scale: scaleLinear, nice: true } } } as never);
      const scene = createChartScene(definition as never, { width: 480, height: 160 });
      stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: 'Revenue' });
      const text = `x scale present: compiled ${scene.nodes.length} nodes`;
      if (readout) readout.textContent = text;
      else stage.say(text);
    } catch (err) {
      stage.box.replaceChildren();
      const text = `x: null threw\n${(err as Error).message}`;
      if (readout) readout.textContent = text;
      else stage.say(text.replace('\n', ': '));
    }
  };
  show(true);
  const options = [[true, 'x scale present'], [false, 'x: null']] as const;
  if (stage.bar) select(stage.bar, 'scales', options, show);
  else stage.cycle([true, false], 2200, show);
  return () => stage.dispose();
};

export default mount;
