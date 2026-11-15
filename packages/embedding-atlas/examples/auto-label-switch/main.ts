// autoLabelEnabled: false keeps queryClusterLabels views free of auto labels
import { EmbeddingView, type EmbeddingViewConfig, type Rectangle } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { pointIndex } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 10000 : 50000 });
  const index = pointIndex(points.x, points.y);

  // Name a cluster after the topic of the first point found in its first rectangle.
  const queryClusterLabels = async (clusters: Rectangle[][]): Promise<(string | null)[]> =>
    clusters.map(([r]) => {
      const ids = r ? index.inRect(r.xMin, r.yMin, r.xMax, r.yMax) : [];
      return ids.length ? points.names[points.category[ids[0]!]!]! : null;
    });

  const config = (autoLabelEnabled: boolean): EmbeddingViewConfig => ({ colorScheme: 'dark', autoLabelEnabled });
  const view = new EmbeddingView(stage.view, {
    data: { x: points.x, y: points.y, category: points.category },
    queryClusterLabels,
    width: stage.width,
    height: stage.height,
    config: config(true),
  });
  stage.own(view);

  if (stage.bar) checkbox(stage.bar, 'autoLabelEnabled', true, (on) => view.update({ config: config(on) }));
  let on = true;
  if (stage.preview) stage.every(2200, () => view.update({ config: config((on = !on)) }));
  return stage.dispose;
};

export default mount;
