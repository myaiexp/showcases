// resolveChartRenderer: the default for plain scenes, a composition once a mark picks canvas
import { areaY, createChartScene, defineChart, lineY, mountChart } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { resolveChartRenderer } from '@tanstack/charts/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { svgChartRenderer } from '@tanstack/charts/svg/renderer';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { revenue } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const scales = { x: { scale: () => scalePoint<string>().padding(0.4) }, y: { scale: scaleLinear, nice: true, grid: true } };
const plain = defineChart({ marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 })], scales });
const mixed = defineChart({
  marks: [areaY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa', fillOpacity: 0.3, renderer: canvasChartRenderer }), lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2 })],
  scales,
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compiled without mounting: the readout is computed from the scenes alone.' });
  if (stage.preview) stage.height -= 46;
  const readout = stage.preview ? null : stage.readout();
  stage.box.style.height = `${stage.height}px`;
  let useMixed = true;

  const ids = (): string => {
    const a = resolveChartRenderer(createChartScene(plain, { width: 400, height: 240 }), svgChartRenderer);
    const b = resolveChartRenderer(createChartScene(mixed, { width: 400, height: 240 }), svgChartRenderer);
    return `plain scene resolves to "${a.id}"\nscene with a canvas mark resolves to "${b.id}"\nthe default renderer is "${svgChartRenderer.id}"`;
  };
  const options = () => ({ definition: useMixed ? mixed : plain, height: stage.height, ariaLabel: 'Revenue' });
  const host = stage.own(mountChart(stage.box, options() as never));
  const text = ids();
  if (readout) readout.textContent = text;
  else stage.say(text.replaceAll('\n', '; '));
  const set = (v: boolean): void => {
    useMixed = v;
    host.update(options() as never);
  };
  if (stage.bar) checkbox(stage.bar, 'mount the scene with the canvas mark', true, set);
  else stage.cycle([true, false], 2400, set);
  return () => stage.dispose();
};

export default mount;
