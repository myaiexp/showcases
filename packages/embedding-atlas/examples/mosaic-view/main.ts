// EmbeddingViewMosaic: point a Mosaic coordinator at a table
import { EmbeddingViewMosaic } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { topicPoints } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a point: the view looks it up in DuckDB itself.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 100000 });

  // A DuckDB table with x, y and a 0-based integer category column.
  const mosaic = await stage.mosaic();
  const table = await mosaic.table('points', { x: points.x, y: points.y, topic: points.category });
  if (stage.disposed) return stage.dispose;

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic',
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (stage.preview) stage.loop((_, t) => view.update({ viewportState: { x: Math.sin(t / 3) * 2, y: Math.cos(t / 4), scale: 0.09 } }));
  return stage.dispose;
};

export default mount;
