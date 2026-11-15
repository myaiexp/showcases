// The vanilla constructor: x, y, category arrays in, point cloud out
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll to zoom, drag to pan, hover a point.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 50000 });

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  return stage.dispose;
};

export default mount;
