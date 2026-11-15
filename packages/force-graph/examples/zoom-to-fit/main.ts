// Render control: zoomToFit(ms, padding) frames every node, over a transition and with edge padding
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Mess up the view with wheel and drag, then fit it again with the chosen duration and padding.' });
  let ms = 800;
  let padding = 20;

  const graph = stage.own(new ForceGraph<GNode, GLink>(stage.container))
    .graphData(clusters(3, stage.preview ? 6 : 10))
    .nodeAutoColorBy('group')
    .linkColor(() => 'rgba(0,0,0,0.25)')
    .cooldownTime(2500)
    .onEngineStop(() => graph.zoomToFit(300, padding));

  if (stage.bar) {
    slider(stage.bar, 'duration', 0, 2000, 100, ms, (v) => (ms = v), (v) => `${v} ms`);
    slider(stage.bar, 'padding', 0, 150, 5, padding, (v) => (padding = v), (v) => `${v} px`);
    button(stage.bar, 'zoomToFit(ms, padding)', () => graph.zoomToFit(ms, padding));
    button(stage.bar, 'throw the view off', () => graph.centerAt(300, -200, 400).zoom(4, 400));
  } else {
    // Throw the view off, then fit it with a different padding each time.
    const pads = [6, 40, 80];
    let i = 0;
    stage.after(3200, () => {
      const step = (): void => {
        graph.centerAt(250, -150, 0).zoom(4, 0);
        stage.after(350, () => graph.zoomToFit(900, pads[i++ % pads.length]!));
      };
      step();
      stage.every(2600, step);
    });
  }

  return stage.dispose;
};

export default mount;
