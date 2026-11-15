// Render control: zoom(k, ms) sets the scale of the canvas, animated when a duration is given
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls zoom(k, ms). Wheel zoom moves the same scale.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 6 : 10))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, 30));
  const say = status(stage, 'zoom() = 1');
  graph.onZoom(({ k }) => say(`zoom() = ${k.toFixed(2)}`));

  if (stage.bar) {
    let ms = 600;
    slider(stage.bar, 'duration', 0, 2000, 100, ms, (v) => (ms = v), (v) => `${v} ms`);
    button(stage.bar, 'zoom(zoom() * 2)', () => graph.zoom(graph.zoom() * 2, ms));
    button(stage.bar, 'zoom(zoom() / 2)', () => graph.zoom(graph.zoom() / 2, ms));
    button(stage.bar, 'zoom(1)', () => graph.zoom(1, ms));
  } else {
    // Breathe in and out once the layout has settled.
    let near = false;
    stage.after(3200, () => {
      const step = (): void => {
        near = !near;
        graph.zoom(near ? 3 : 1.2, 1400);
      };
      step();
      stage.every(2000, step);
    });
  }

  return stage.dispose;
};

export default mount;
