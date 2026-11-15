// The cache prop: automatic labels are stored and come back without a recompute
import { EmbeddingView, type Cache, type Rectangle } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, eventLog } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { pointIndex } from '../../shared/query.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Remount the view: the second time the labels come from the cache.' });
  const points = topicPoints({ count: stage.preview ? 8000 : 40000 });
  const index = pointIndex(points.x, points.y);
  const log = stage.preview ? () => {} : eventLog(stage.box, 8);

  // Any object with async get/set will do; this one is a Map that logs what passes through.
  const store = new Map<string, unknown>();
  const cache: Cache = {
    async get(key) {
      const hit = store.get(key) ?? null;
      log(`cache.get → ${hit ? 'hit' : 'miss'}`);
      return hit;
    },
    async set(key, value) {
      store.set(key, value);
      log(`cache.set (${store.size} entr${store.size === 1 ? 'y' : 'ies'})`);
    },
  };

  const queryClusterLabels = async (clusters: Rectangle[][]): Promise<string[]> => {
    log(`queryClusterLabels called for ${clusters.length} clusters`);
    return clusters.map((rects) => {
      const r = rects[0]!;
      const ids = index.inRect(r.xMin, r.yMin, r.xMax, r.yMax);
      return ids.length ? points.names[points.category[ids[0]!]!]! : '?';
    });
  };

  let view: EmbeddingView | null = null;
  const remount = (): void => {
    view?.destroy();
    stage.view.replaceChildren();
    view = new EmbeddingView(stage.view, {
      data: { x: points.x, y: points.y, category: points.category },
      queryClusterLabels,
      cache,
      width: stage.width,
      height: stage.height,
      config: { colorScheme: 'dark' },
    });
    log('— mounted —');
  };
  remount();
  stage.onDispose(() => view?.destroy());

  if (stage.bar) button(stage.bar, 'remount', remount);
  if (stage.preview) stage.every(5000, remount);
  return stage.dispose;
};

export default mount;
