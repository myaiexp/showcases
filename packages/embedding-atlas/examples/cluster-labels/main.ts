// queryClusterLabels: the view finds dense clusters, the app names each one
import { EmbeddingView, type Rectangle } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { eventLog } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { pointIndex } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom in: smaller clusters get their own names.' });
  const points = topicPoints({ count: stage.preview ? 10000 : 60000, topics: 8 });
  const index = pointIndex(points.x, points.y);
  const log = stage.preview ? () => {} : eventLog(stage.box, 6);

  // Each cluster arrives as rectangles that roughly cover it; name it after the most
  // frequent word in the texts of the points inside.
  const queryClusterLabels = async (clusters: Rectangle[][]): Promise<(string | null)[]> => {
    log(`queryClusterLabels: ${clusters.length} clusters`);
    return clusters.map((rects) => {
      const counts = new Map<string, number>();
      for (const r of rects) {
        for (const i of index.inRect(r.xMin, r.yMin, r.xMax, r.yMax)) {
          for (const w of points.text(i).split(' ')) if (w.length > 4) counts.set(w, (counts.get(w) ?? 0) + 1);
        }
      }
      let best: string | null = null, n = 0;
      for (const [w, c] of counts) {
        if (c > n) {
          best = w;
          n = c;
        }
      }
      return best;
    });
  };

  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    queryClusterLabels,
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (stage.preview) stage.loop((_, t) => view.update({ viewportState: { x: 0, y: 0, scale: 0.075 + 0.02 * Math.sin(t / 2) } }));
  return stage.dispose;
};

export default mount;
