// createMark's third argument: the custom mark's nodes paint on a canvas layer
import { createMark, defineChart, mountChart } from '@tanstack/charts';
import type { SceneNode } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { cloud, type Pt } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = cloud(1500, 5);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the renderer: the dots become circle elements, and the readout counts them.' });
  const readout = stage.preview ? null : stage.readout();
  let canvas = true;
  // A layered host fills its container, so the container needs a definite height.
  stage.box.style.height = `${stage.height}px`;

  const swarm = (useCanvas: boolean) =>
    createMark<Pt, number, number>(
      ({ markIndex }) => ({
        id: `swarm-${markIndex}`,
        channels: { x: { scale: 'x', values: rows.map((r) => r.x) }, y: { scale: 'y', values: rows.map((r) => r.y) } },
        render({ scales, theme }) {
          const nodes: SceneNode[] = rows.map((r) => ({ kind: 'dot', key: r.id, x: scales.x!.map(r.x), y: scales.y!.map(r.y), radius: 2.2, style: { fill: theme.palette[0]!, fillOpacity: 0.55 } }));
          return { nodes };
        },
      }),
      undefined,
      useCanvas ? canvasChartRenderer : undefined,
    );

  const options = () => ({
    definition: defineChart({
      marks: [swarm(canvas)],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Custom mark on canvas',
  });
  const host = stage.own(mountChart(stage.box, options()));
  const report = (): void => {
    if (readout) readout.textContent = `circle elements: ${stage.box.querySelectorAll('circle').length}, canvas elements: ${stage.box.querySelectorAll('canvas').length}`;
  };
  if (stage.bar) {
    checkbox(stage.bar, 'canvasChartRenderer', true, (v) => {
      canvas = v;
      host.update(options());
      queueMicrotask(report);
    });
  } else stage.cycle([true, false], 2600, (v) => {
    canvas = v;
    host.update(options());
  });
  stage.after(60, report);
  return () => stage.dispose();
};

export default mount;
