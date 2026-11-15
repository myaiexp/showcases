// Node styling: nodeThreeObject returns a Sprite textured with an avatar painted on a canvas
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { sprites } from '../../shared/sprites.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every node is a sprite with its own picture, painted in code.' });
  const make = sprites(stage);
  const hues = [215, 25, 95];

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeThreeObject((n) => {
      const hue = hues[(n.group ?? 1) - 1]!;
      const seed = String(n.id).charCodeAt(0);
      // The picture: a round avatar with a gradient, a few shapes and the initial.
      return make.draw(
        96,
        96,
        (c) => {
          const g = c.createLinearGradient(0, 0, 96, 96);
          g.addColorStop(0, `hsl(${hue}, 80%, 65%)`);
          g.addColorStop(1, `hsl(${(hue + 50 + (seed % 40)) % 360}, 70%, 35%)`);
          c.fillStyle = g;
          c.beginPath();
          c.arc(48, 48, 44, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = 'rgba(255,255,255,0.18)';
          c.beginPath();
          c.arc(30 + (seed % 5) * 8, 28, 14, 0, Math.PI * 2);
          c.fill();
          c.lineWidth = 4;
          c.strokeStyle = 'rgba(255,255,255,0.8)';
          c.stroke();
          c.fillStyle = '#fff';
          c.font = '700 44px sans-serif';
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.fillText((n.name ?? '?').charAt(0), 48, 52);
        },
        Math.cbrt(n.val ?? 1) * 7 + 5,
      );
    });

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(30));
  }

  if (!stage.preview) fitOnce(graph);

  return stage.dispose;
};

export default mount;
