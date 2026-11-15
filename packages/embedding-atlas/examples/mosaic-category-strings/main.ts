// String categories turned into the 0-based integers the category column needs
import { EmbeddingViewMosaic } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { readout } from '../../shared/controls.ts';
import { topicPoints } from '../../shared/data.ts';
import { rows } from '../../shared/mosaic-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const points = topicPoints({ count: stage.preview ? 8000 : 50000 });
  const mosaic = await stage.mosaic();
  // The table only has topic names, as text.
  const table = await mosaic.table('docs', { x: points.x, y: points.y, topic: Array.from(points.category, (c) => points.names[c]!) });

  // "If you have categories represented as strings, you should first convert them to
  // 0-indexed integers": DENSE_RANK over the sorted names gives 1, 2, …, minus one.
  await mosaic.exec(`ALTER TABLE "${table}" ADD COLUMN topic_id INTEGER`);
  await mosaic.exec(`UPDATE "${table}" AS t SET topic_id = r.id FROM (
    SELECT topic, (DENSE_RANK() OVER (ORDER BY topic) - 1)::INTEGER AS id FROM (SELECT DISTINCT topic FROM "${table}")
  ) AS r WHERE t.topic = r.topic`);
  if (stage.disposed) return stage.dispose;

  const view = new EmbeddingViewMosaic(stage.view, {
    coordinator: mosaic.coordinator,
    table,
    x: 'x',
    y: 'y',
    category: 'topic_id',
    width: stage.width,
    height: stage.height,
    config: { colorScheme: 'dark' },
  });
  stage.own(view);

  if (!stage.preview) {
    const ids = await rows<{ topic: string; topic_id: number }>(
      mosaic.coordinator,
      `SELECT DISTINCT topic, topic_id FROM "${table}" ORDER BY topic_id`,
    );
    readout(stage.box, ids.map((r) => `${r.topic_id} ← ${r.topic}`).join('   '));
  } else {
    stage.loop((_, t) => view.update({ viewportState: { x: Math.sin(t / 3) * 2, y: 0, scale: 0.085 } }));
  }
  return stage.dispose;
};

export default mount;
