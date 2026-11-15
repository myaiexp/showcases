// A responsive builder compiled at exact sizes: the scene changes with the width it is given
import { createChartRuntime, defineChart, lineY, renderChartSvg } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { countNodes } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each size is rendered through the same runtime and the same builder function.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const runtime = createChartRuntime<Revenue, string, number>();
  stage.onDispose(() => runtime.destroy());

  const definition = defineChart(({ width }) => ({
    marks: [lineY(revenue, { x: 'month', y: 'revenue', stroke: '#60a5fa', strokeWidth: 2, points: width >= 480 })],
    scales: { x: { scale: () => scalePoint<string>().padding(0.3) }, y: { scale: scaleLinear, nice: width < 480 ? 3 : true, grid: true } },
  }));

  const show = (width: number): void => {
    const scene = runtime.render(definition, { width, height: stage.preview ? stage.height : 240 });
    stage.box.style.width = `${width}px`;
    stage.box.style.maxWidth = '100%';
    stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: `Revenue at ${width}`, idPrefix: stage.id('rr') });
    const kinds = countNodes(scene.nodes);
    const text = `width ${width}: y ticks ${scene.scales.y?.ticks.length}, dots ${kinds.dot ?? 0}, nodes ${Object.values(kinds).reduce((s, n) => s + n, 0)}, margin left ${scene.margin.left.toFixed(0)}`;
    if (readout) readout.textContent = text;
    else stage.say(text);
  };
  const widths = [320, 640, 960] as const;
  if (stage.bar) select(stage.bar, 'width', widths.map((w) => [w, `${w}px`] as const), show, 640);
  show(stage.bar ? 640 : 320);
  if (!stage.bar) stage.cycle(widths, 2000, show);
  return () => stage.dispose();
};

export default mount;
