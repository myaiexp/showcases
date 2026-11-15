// Node styling: nodeCanvasObject in replace mode draws a different shape for each group
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { clusters, PALETTE, type SampleNode as BaseNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type SampleNode = BaseNode & { x?: number; y?: number };

/** Traces a shape of "radius" r around (x, y); the caller fills it. */
function trace(c: CanvasRenderingContext2D, group: number, x: number, y: number, r: number): void {
  c.beginPath();
  if (group === 1) c.rect(x - r, y - r, 2 * r, 2 * r);
  else if (group === 2) {
    c.moveTo(x, y - r * 1.2);
    c.lineTo(x + r * 1.1, y + r * 0.8);
    c.lineTo(x - r * 1.1, y + r * 0.8);
    c.closePath();
  } else if (group === 3) {
    c.moveTo(x, y - r * 1.3);
    c.lineTo(x + r * 1.3, y);
    c.lineTo(x, y + r * 1.3);
    c.lineTo(x - r * 1.3, y);
    c.closePath();
  } else c.arc(x, y, r, 0, 2 * Math.PI);
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Group 1 squares, group 2 triangles, group 3 diamonds, group 4 circles.' });
  let outline = true;

  const graph = stage
    .own(new ForceGraph<SampleNode>(stage.container))
    .graphData(clusters(4, stage.preview ? 6 : 10))
    .nodeLabel((n) => `${n.name}`)
    .nodeCanvasObjectMode(() => 'replace')
    .nodeCanvasObject((node, c, scale) => {
      const r = 3 + (node.val ?? 1) * 1.2;
      trace(c, node.group ?? 1, node.x ?? 0, node.y ?? 0, r);
      c.fillStyle = PALETTE[node.group ?? 1]!;
      c.fill();
      if (outline) {
        c.lineWidth = 1.2 / scale;
        c.strokeStyle = '#ffffff';
        c.stroke();
      }
    })
    .nodePointerAreaPaint((node, paint, c) => {
      trace(c, node.group ?? 1, node.x ?? 0, node.y ?? 0, 3 + (node.val ?? 1) * 1.2 + 1);
      c.fillStyle = paint;
      c.fill();
    })
    .autoPauseRedraw(false);

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 14));
    let seed = 3;
    stage.every(6000, () => graph.graphData(clusters(4, 6, ++seed)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    checkbox(stage.bar, 'white outline', true, (on) => {
      outline = on;
    });
  }

  return stage.dispose;
};

export default mount;
