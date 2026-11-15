// image + importance columns: clusters labelled by top image
import { EmbeddingViewMosaic } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';
import { thumbnail } from './thumbnail.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in: smaller regions pick their own top image.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const n = points.count;

  // One row in 25 carries an image, a numbered thumbnail drawn in code; the rest are NULL.
  // Importance is a score per row (think PageRank). Each region shows its single most important
  // row's image, and a region whose winner has no image gets no label, so imageless rows score
  // below every row with one.
  const importance = new Float64Array(n);
  const image: (string | null)[] = [];
  for (let i = 0; i < n; i++) {
    const hasImage = i % 25 === 0;
    importance[i] = ((i * 7919) % 1000) + (hasImage ? 1000 : 0);
    image.push(hasImage ? thumbnail(points.category[i]!, i) : null);
  }
  const id = Int32Array.from({ length: n }, (_, i) => i);

  const mosaic = await stage.mosaic();
  const table = await mosaic.table('pics', { id, x: points.x, y: points.y, topic: points.category, image, importance });
  if (stage.disposed) return stage.dispose;

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic',
    // Image labels look rows up by id, so identifier is required alongside image and importance.
    identifier: 'id',
    image: 'image',
    importance: 'importance',
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (stage.preview) stage.loop((_, t) => view.update({ viewportState: { x: 0, y: 0, scale: 0.075 + 0.03 * Math.sin(t / 2) ** 2 } }));
  return stage.dispose;
};

export default mount;
