// Link styling: linkCanvasObject in 'after' mode writes each link's name along the line, over the default link
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Pt = SampleNode & { x: number; y: number };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in: names appear on the links that are long enough to hold them.' });
  let fontPx = stage.preview ? 8 : 11;

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(2, stage.preview ? 5 : 8))
    .nodeColor(() => '#9aa3ad')
    .linkWidth(1.5)
    .linkColor(() => 'rgba(0,0,0,0.3)')
    .linkCanvasObjectMode(() => 'after')
    .linkCanvasObject((link, c, scale) => {
      const a = link.source as unknown as Pt;
      const b = link.target as unknown as Pt;
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      const fs = fontPx / scale;
      c.font = `${fs}px sans-serif`;
      const textW = c.measureText(link.name).width;
      // Skip links too short on screen to carry their name.
      if (len < textW * 1.15) return;
      let angle = Math.atan2(b.y - a.y, b.x - a.x);
      // Keep the text upright: never upside down.
      if (angle > Math.PI / 2) angle -= Math.PI;
      if (angle < -Math.PI / 2) angle += Math.PI;
      c.save();
      c.translate((a.x + b.x) / 2, (a.y + b.y) / 2);
      c.rotate(angle);
      c.fillStyle = 'rgba(246,243,236,0.9)';
      c.fillRect(-textW / 2 - fs * 0.2, -fs * 0.6, textW + fs * 0.4, fs * 1.2);
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillStyle = '#2b2b2b';
      c.fillText(link.name, 0, fs * 0.05);
      c.restore();
    });

  if (stage.preview) {
    let fit = 1;
    graph.cooldownTime(2500).onEngineStop(() => {
      graph.zoomToFit(300, 22);
      stage.after(400, () => {
        fit = graph.zoom();
      });
    });
    // Zooming in makes more links long enough on screen to show their names.
    let closer = false;
    stage.after(3400, () => stage.every(2400, () => {
      closer = !closer;
      graph.zoom(closer ? fit * 1.8 : fit, 1200);
    }));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 30));
    slider(stage.bar, 'font size', 7, 18, 1, fontPx, (v) => {
      fontPx = v;
      graph.linkCanvasObject(graph.linkCanvasObject());
    }, (v) => `${v}px`);
  }

  return stage.dispose;
};

export default mount;
