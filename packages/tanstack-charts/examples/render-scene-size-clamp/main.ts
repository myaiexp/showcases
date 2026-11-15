// What createChartScene returns for sizes that are zero, negative, NaN or ordinary
import { barY, createChartScene, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const sizes: readonly (readonly [number, number])[] = [[0, 0], [-40, 120], [Number.NaN, 200], [0.4, 0.4], [480, 200]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a size: the scene reports what it actually used.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true } },
  });

  const show = ([w, h]: readonly [number, number]): void => {
    const scene = createChartScene(definition, { width: w, height: h });
    const markup = renderChartSvg(scene, { ariaLabel: 'Clamped scene' });
    stage.box.innerHTML = scene.width >= 100 ? markup : '';
    const text = `asked ${w} x ${h}\nscene ${scene.width} x ${scene.height}\nplot ${scene.chart.width.toFixed(2)} x ${scene.chart.height.toFixed(2)}, ${scene.nodes.length} nodes, svg ${markup.length} characters`;
    if (readout) readout.textContent = text;
    else stage.say(text.replaceAll('\n', '; '));
  };
  show(sizes[4]!);
  const label = ([w, h]: readonly [number, number]): string => `${w} x ${h}`;
  if (stage.bar) select(stage.bar, 'requested size', sizes.map((s) => [s, label(s)] as const), show, sizes[4]);
  else stage.cycle([sizes[4]!, sizes[0]!, sizes[4]!, sizes[2]!, sizes[4]!, sizes[3]!], 1600, show);
  return () => stage.dispose();
};

export default mount;
