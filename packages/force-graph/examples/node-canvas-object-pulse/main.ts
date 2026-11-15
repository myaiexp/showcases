// Node styling: nodeCanvasObject reads the clock, so nodes pulse; autoPauseRedraw(false) keeps the canvas drawing
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { clusters, PALETTE, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Node = SampleNode & { x?: number; y?: number; index?: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The painter uses the time each frame. Without autoPauseRedraw(false) it would freeze when the layout stops.' });
  let rate = 2;

  const graph = stage
    .own(new ForceGraph<Node>(stage.container))
    .graphData(clusters(3, stage.preview ? 8 : 14))
    .nodeLabel((n) => `${n.name}`)
    .nodeCanvasObjectMode(() => 'replace')
    .nodeCanvasObject((node, c) => {
      const t = performance.now() / 1000;
      const base = 3 + (node.val ?? 1) * 1.5;
      // Each node keeps its own phase, taken from its index in the data.
      const phase = ((node.index ?? 0) * 0.9) % (2 * Math.PI);
      const beat = 0.5 + 0.5 * Math.sin(t * rate + phase);
      const colour = PALETTE[node.group ?? 1]!;
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      // A ring that expands and fades, then the core that swells a little.
      c.beginPath();
      c.arc(x, y, base * (1 + 1.2 * beat), 0, 2 * Math.PI);
      c.strokeStyle = colour;
      c.globalAlpha = 0.5 * (1 - beat);
      c.lineWidth = 1.5;
      c.stroke();
      c.globalAlpha = 1;
      c.beginPath();
      c.arc(x, y, base * (0.85 + 0.3 * beat), 0, 2 * Math.PI);
      c.fillStyle = colour;
      c.fill();
    })
    // Nothing else changes once the layout stops, so the canvas would stop redrawing.
    .autoPauseRedraw(false);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 22));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 30));
    slider(stage.bar, 'pulse rate', 0.5, 8, 0.5, rate, (v) => {
      rate = v;
    }, (v) => `${v}/s`);
  }

  return stage.dispose;
};

export default mount;
