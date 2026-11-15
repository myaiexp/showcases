// The text column: default tooltips and automatic labels use it
import { EmbeddingViewMosaic } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { texts, topicPoints } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover for the text; zoom in for finer labels.' });
  const points = topicPoints({ count: stage.preview ? 6000 : 40000, topics: 8 });
  const mosaic = await stage.mosaic();
  const table = await mosaic.table('docs', { x: points.x, y: points.y, topic: points.category, text: texts(points) });
  if (stage.disposed) return stage.dispose;

  // With a text column and no labels prop, labels are generated from the texts in each cluster.
  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic',
    text: 'text',
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (stage.preview) stage.loop((_, t) => view.update({ viewportState: { x: 0, y: 0, scale: 0.075 + 0.02 * Math.sin(t / 2) } }));
  return stage.dispose;
};

export default mount;
