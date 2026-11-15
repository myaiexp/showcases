// Link styling: linkCanvasObject in replace mode paints each link itself: tapered, doubled or as a gradient
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { network, PALETTE, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Pt = SampleNode & { x: number; y: number };
const STYLES = ['tapered', 'double', 'gradient'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The links are not drawn by the library: your function gets the link, a canvas context and the zoom.' });
  let style: (typeof STYLES)[number] = 'tapered';

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(3, stage.preview ? 6 : 10))
    .nodeColor((n) => PALETTE[n.group ?? 1]!)
    .nodeRelSize(4)
    .linkCanvasObjectMode(() => 'replace')
    .linkCanvasObject((link, c, scale) => {
      const a = link.source as unknown as Pt;
      const b = link.target as unknown as Pt;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy);
      if (!len) return;
      // Unit normal to the link: sideways offsets are along it.
      const nx = -dy / len;
      const ny = dx / len;
      if (style === 'tapered') {
        // A wedge: wide at the source, a point at the target; the width is in screen pixels.
        const w = (2 + link.value * 1.4) / scale;
        c.beginPath();
        c.moveTo(a.x + (nx * w) / 2, a.y + (ny * w) / 2);
        c.lineTo(a.x - (nx * w) / 2, a.y - (ny * w) / 2);
        c.lineTo(b.x, b.y);
        c.closePath();
        c.fillStyle = 'rgba(40,50,70,0.45)';
        c.fill();
      } else if (style === 'double') {
        c.lineWidth = 1 / scale;
        c.strokeStyle = 'rgba(40,50,70,0.6)';
        for (const side of [-1, 1]) {
          const o = (side * 2) / scale;
          c.beginPath();
          c.moveTo(a.x + nx * o, a.y + ny * o);
          c.lineTo(b.x + nx * o, b.y + ny * o);
          c.stroke();
        }
      } else {
        const g = c.createLinearGradient(a.x, a.y, b.x, b.y);
        g.addColorStop(0, PALETTE[a.group ?? 1]!);
        g.addColorStop(1, PALETTE[b.group ?? 1]!);
        c.lineWidth = 2.5 / scale;
        c.strokeStyle = g;
        c.beginPath();
        c.moveTo(a.x, a.y);
        c.lineTo(b.x, b.y);
        c.stroke();
      }
    })
    .autoPauseRedraw(false);
  const use = (s: (typeof STYLES)[number]): void => {
    style = s;
  };

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let i = 0;
    stage.after(2800, () => stage.every(1800, () => use(STYLES[++i % STYLES.length]!)));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'link style', STYLES, use);
  }

  return stage.dispose;
};

export default mount;
