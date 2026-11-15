// Node styling: nodeCanvasObject in 'after' mode adds a label only once the zoom (globalScale) is high enough
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { clusters, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in with the wheel: names fade in once the zoom passes the threshold.' });
  const zoomNote = stage.bar && readout(stage.bar);
  // The zoom at which labels are fully visible; they fade in over the 30 % below it.
  let threshold = 3;

  const graph = stage
    .own(new ForceGraph<Node>(stage.container))
    .graphData(clusters(3, stage.preview ? 8 : 14))
    .nodeAutoColorBy('group')
    .nodeRelSize(4)
    .nodeCanvasObjectMode(() => 'after')
    .nodeCanvasObject((node, c, scale) => {
      const alpha = Math.min(1, (scale - threshold * 0.7) / (threshold * 0.3));
      if (alpha <= 0) return;
      const fs = 12 / scale;
      c.font = `${fs}px sans-serif`;
      c.textAlign = 'center';
      c.textBaseline = 'top';
      c.fillStyle = `rgba(29,29,27,${alpha})`;
      c.fillText(String(node.name), node.x ?? 0, (node.y ?? 0) + 5 + 2 / scale);
    })
    .onZoom(({ k }) => {
      if (zoomNote) zoomNote.textContent = `zoom ${k.toFixed(2)}, labels ${k >= threshold ? 'on' : k > threshold * 0.7 ? 'fading in' : 'off'}`;
    })
    .autoPauseRedraw(false);

  if (stage.preview) {
    let fit = 1;
    graph.cooldownTime(2500).onEngineStop(() => {
      graph.zoomToFit(300, 22);
      stage.after(400, () => {
        fit = graph.zoom();
        // Labels appear at 2.2 times the zoom that fits the graph.
        threshold = fit * 2.2;
      });
    });
    let closer = false;
    stage.after(3400, () => stage.every(2600, () => {
      closer = !closer;
      graph.zoom(closer ? fit * 3 : fit, 1400);
    }));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 30));
    slider(stage.bar, 'label zoom', 1, 6, 0.5, threshold, (v) => {
      threshold = v;
    }, (v) => `${v}`);
  }

  return stage.dispose;
};

export default mount;
