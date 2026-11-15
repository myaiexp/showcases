// Only x and y: with no category array every point shares one colour
import { EmbeddingView } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll to zoom, drag to pan.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 80000, topics: 8, spread: 1.3 });

  // data.category is optional; leaving it out draws the cloud in a single colour.
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y },
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  // Cards drift slowly across the cloud through the controlled viewportState prop.
  if (stage.preview) {
    stage.loop((_, t) => view.update({ viewportState: { x: Math.sin(t / 4) * 3, y: Math.cos(t / 5) * 2, scale: 0.09 } }));
  }
  return stage.dispose;
};

export default mount;
