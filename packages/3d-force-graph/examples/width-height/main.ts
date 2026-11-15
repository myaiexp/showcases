// Container layout: width() and height() size the canvas; here they change under a fixed frame
import ForceGraph3D from '3d-force-graph';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { randomTree } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The frame stays the same size: the canvas inside it is what width and height change.' });
  const W = stage.width;
  const H = stage.height;

  const graph = stage.own(new ForceGraph3D(stage.container)).graphData(randomTree(stage.preview ? 40 : 90, 2));
  // Keep the whole graph in view as the canvas changes shape.
  const refit = (): void => {
    graph.zoomToFit(300, 10);
  };
  graph.cooldownTime(2500).onEngineStop(refit);
  // A frame to show the canvas edge against.
  stage.container.style.outline = '1px dashed rgba(255,255,255,0.35)';

  if (stage.preview) {
    const sizes: [number, number][] = [[W, H], [Math.round(W * 0.5), H], [Math.round(W * 0.5), Math.round(H * 0.5)], [W, Math.round(H * 0.5)]];
    let i = 0;
    stage.every(1800, () => {
      const [w, h] = sizes[++i % sizes.length]!;
      graph.width(w).height(h);
      // The new size reaches the renderer on the next digest.
      stage.after(80, refit);
    });
  }

  if (stage.bar) {
    slider(stage.bar, 'width', 160, W, 10, W, (v) => {
      graph.width(v);
      stage.after(80, refit);
    }, (v) => `${v}px`);
    slider(stage.bar, 'height', 120, H, 10, H, (v) => {
      graph.height(v);
      stage.after(80, refit);
    }, (v) => `${v}px`);
    button(stage.bar, 'Refit', refit);
  }

  return stage.dispose;
};

export default mount;
