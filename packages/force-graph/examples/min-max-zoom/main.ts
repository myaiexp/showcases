// Render control: minZoom and maxZoom clamp the wheel and programmatic zoom() alike
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { status } from '../../shared/status.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll or press the buttons: the scale never leaves the limits you set.' });

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 6 : 10))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .minZoom(0.8)
    .maxZoom(3)
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoom(1.5, 400).centerAt(0, 0, 400));
  const say = status(stage);
  const show = (k = graph.zoom()): void => say(`zoom() = ${k.toFixed(2)}  (limits ${graph.minZoom()} to ${graph.maxZoom()})`);
  show(1);
  graph.onZoom(({ k }) => show(k));

  if (stage.bar) {
    slider(stage.bar, 'minZoom', 0.1, 1.5, 0.1, 0.8, (v) => graph.minZoom(v), (v) => v.toFixed(1));
    slider(stage.bar, 'maxZoom', 1.5, 8, 0.5, 3, (v) => graph.maxZoom(v), (v) => v.toFixed(1));
    button(stage.bar, 'zoom(100)', () => graph.zoom(100, 400));
    button(stage.bar, 'zoom(0.01)', () => graph.zoom(0.01, 400));
  } else {
    let out = false;
    stage.after(3200, () => {
      const step = (): void => {
        out = !out;
        // Ask for far more than the limits allow: the scale stops at 3 and at 0.8.
        graph.zoom(out ? 100 : 0.01, 1200);
      };
      step();
      stage.every(2200, step);
    });
  }

  return stage.dispose;
};

export default mount;
