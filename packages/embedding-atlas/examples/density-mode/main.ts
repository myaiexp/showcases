// mode: "density" draws the cloud as density contours instead of points
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in far enough and individual points show again.' });
  const points = topicPoints({ count: stage.preview ? 20000 : 200000, topics: 8 });

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark', mode: 'density' },
  });
  stage.own(view);

  if (stage.preview) {
    const [cx, cy] = points.centres[2]!;
    stage.loop((_, t) => {
      const k = (1 - Math.cos(t / 2)) / 2;
      view.update({ viewportState: { x: cx * k, y: cy * k, scale: 0.075 * 2 ** (k * 3) } });
    });
  }
  return stage.dispose;
};

export default mount;
