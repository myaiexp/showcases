// Render control: autoPauseRedraw stops repainting when the engine stops, unless an overlay needs it
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, type GLink, type GNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['pause: true', 'pause: false'],
    hint: 'Both layouts stop after 2 s. Only the right one keeps repainting, so only its ring keeps pulsing.',
  });
  const data = clusters(2, 8);

  const build = (pane: (typeof stage.panes)[number], pause: boolean): ForceGraph<GNode, GLink> => {
    const graph = stage.own(new ForceGraph<GNode, GLink>(pane.container), pane)
      .graphData(structuredClone(data))
      .nodeAutoColorBy('group')
      .linkColor(() => 'rgba(0,0,0,0.25)')
      .cooldownTime(2000)
      .autoPauseRedraw(pause)
      // An overlay that depends on the clock: it only animates while frames are being drawn.
      .onRenderFramePost((c, scale) => {
        const pulse = 0.5 + 0.5 * Math.sin(performance.now() / 250);
        for (const n of graph.graphData().nodes) {
          if (!String(n.id).endsWith('-0')) continue;
          c.beginPath();
          c.arc(n.x ?? 0, n.y ?? 0, 7 + 6 * pulse, 0, 2 * Math.PI);
          c.strokeStyle = '#e4572e';
          c.lineWidth = 2 / scale;
          c.stroke();
        }
      })
      .onEngineStop(() => graph.zoomToFit(300, 22));
    return graph;
  };
  const left = build(stage.panes[0]!, true);
  const right = build(stage.panes[1]!, false);

  if (stage.bar) {
    checkbox(stage.bar, 'left pane autoPauseRedraw', true, (v) => left.autoPauseRedraw(v));
    checkbox(stage.bar, 'right pane autoPauseRedraw', false, (v) => right.autoPauseRedraw(v));
  }

  return stage.dispose;
};

export default mount;
