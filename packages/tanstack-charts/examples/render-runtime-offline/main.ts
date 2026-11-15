// runtime.render(definition, size): a scene for any size, then SVG, with nothing mounted
import { barY, createChartRuntime, defineChart, renderChartSvg } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { revenue, type Revenue } from '../../shared/render-data.ts';
import { describeScene } from '../../shared/render-view.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the size: each change is a new runtime.render call, not a resize of a mounted chart.' });
  stage.box.style.maxWidth = '640px'; // a static svg scales to its box, so cap its height
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();

  // Generics name the datum and axis value types, since no definition has been seen yet.
  const runtime = createChartRuntime<Revenue, string, number>();
  stage.onDispose(() => runtime.destroy());
  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
  });

  const show = (width: number, height: number): void => {
    const scene = runtime.render(definition, { width, height });
    stage.box.style.width = `${width}px`;
    stage.box.style.maxWidth = '100%';
    stage.box.innerHTML = renderChartSvg(scene, { ariaLabel: `Revenue at ${width} by ${height}`, idPrefix: stage.id('rt') });
    if (readout) readout.textContent = describeScene(scene);
    else stage.say(`${width} x ${height}: plot ${scene.chart.width.toFixed(0)} x ${scene.chart.height.toFixed(0)}, ${scene.points.length} points`);
  };
  const size = { w: 560, h: stage.preview ? stage.height : 260 };
  show(size.w, size.h);
  if (stage.bar) {
    slider(stage.bar, 'width', 200, 900, 20, size.w, (v) => { size.w = v; show(size.w, size.h); }, (v) => `${v}px`);
    slider(stage.bar, 'height', 120, 400, 20, size.h, (v) => { size.h = v; show(size.w, size.h); }, (v) => `${v}px`);
  } else stage.cycle([260, 420, 560], 1800, (w) => show(w, size.h));
  return () => stage.dispose();
};

export default mount;
