// Replacing data every frame: points glide between two layouts
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each frame passes new x and y arrays through update().' });
  const points = topicPoints({ count: stage.preview ? 6000 : 30000 });
  const n = points.count;

  // Layout B: every topic on its own spoke of a wheel, ordered by distance from its centre.
  const bx = new Float32Array(n);
  const by = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const c = points.category[i]!;
    const [cx, cy] = points.centres[c]!;
    const r = 1 + Math.hypot(points.x[i]! - cx, points.y[i]! - cy) * 2.2;
    const a = (c / points.names.length) * Math.PI * 2 + (points.y[i]! - cy) * 0.05;
    bx[i] = Math.cos(a) * r;
    by[i] = Math.sin(a) * r;
  }

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    viewportState: { x: 0, y: 0, scale: 0.08 },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  // update() compares props by identity, so each frame hands over fresh arrays.
  stage.loop((_, t) => {
    const k = (1 - Math.cos(t * 0.9)) / 2;
    const x = new Float32Array(n);
    const y = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      x[i] = points.x[i]! + (bx[i]! - points.x[i]!) * k;
      y[i] = points.y[i]! + (by[i]! - points.y[i]!) * k;
    }
    view.update({ data: { x, y, category: points.category } });
  });
  return stage.dispose;
};

export default mount;
