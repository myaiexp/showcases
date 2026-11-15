// Link styling: linkDirectionalParticleCanvasObject paints each particle itself: squares, comets or diamonds
import ForceGraph from 'force-graph';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { KIND_COLOR, network, type NetworkLink, type SampleNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

type Pt = SampleNode & { x: number; y: number };
const STYLES = ['squares', 'comets', 'diamonds'] as const;
type Style = (typeof STYLES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Your function is called for every particle with its position, its link and the zoom.' });
  let style: Style = 'comets';

  const graph = stage
    .own(new ForceGraph<SampleNode, NetworkLink>(stage.container))
    .graphData(network(3, stage.preview ? 6 : 10))
    .nodeColor(() => '#9aa3ad')
    .linkColor(() => 'rgba(0,0,0,0.2)')
    .linkDirectionalParticles(2)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleCanvasObject((x, y, link, c, scale) => {
      const a = link.source as unknown as Pt;
      const b = link.target as unknown as Pt;
      const angle = Math.atan2(b.y - a.y, b.x - a.x);
      const colour = KIND_COLOR[link.type];
      const s = 5 / scale;
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      if (style === 'comets') {
        // A round head with a tail fading out behind it (back along the link).
        const g = c.createLinearGradient(0, 0, -s * 5, 0);
        g.addColorStop(0, colour);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        c.fillStyle = g;
        c.beginPath();
        c.moveTo(0, -s * 0.5);
        c.lineTo(-s * 5, 0);
        c.lineTo(0, s * 0.5);
        c.closePath();
        c.fill();
        c.fillStyle = colour;
        c.beginPath();
        c.arc(0, 0, s * 0.55, 0, 2 * Math.PI);
        c.fill();
      } else if (style === 'squares') {
        c.fillStyle = colour;
        c.fillRect(-s / 2, -s / 2, s, s);
      } else {
        c.fillStyle = colour;
        c.beginPath();
        c.moveTo(s * 0.8, 0);
        c.lineTo(0, s * 0.5);
        c.lineTo(-s * 0.8, 0);
        c.lineTo(0, -s * 0.5);
        c.closePath();
        c.fill();
      }
      c.restore();
    });

  if (stage.preview) {
    graph.cooldownTime(2500).onEngineStop(() => graph.zoomToFit(300, 18));
    let i = 0;
    stage.after(2800, () => stage.every(2200, () => {
      style = STYLES[++i % STYLES.length]!;
    }));
  } else if (stage.bar) {
    graph.cooldownTime(4000).onEngineStop(() => graph.zoomToFit(300, 20));
    select(stage.bar, 'particle shape', STYLES, (s) => {
      style = s;
    }, style);
  }

  return stage.dispose;
};

export default mount;
