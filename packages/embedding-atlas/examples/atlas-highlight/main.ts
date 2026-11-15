// highlight: row ids marked on the embedding view and in the instances table
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, infoPanel } from '../../shared/atlas-kit.ts';
import { select } from '../../shared/controls.ts';
import { rows } from '../../shared/mosaic-kit.ts';

const GROUPS = ['astronomy', 'cooking', 'sailing', 'music', 'gardening', 'chess'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 520, hint: 'highlight is a list of row ids, set from outside' });
  if (stage.disposed) return stage.dispose;
  const info = infoPanel(stage);
  const atlas = stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      // Cards drop the embedding panel (it needs WebGPU) so the table, where highlights also show, fills the space.
      defaultChartsConfig: { include: ['topic', 'rating'], embedding: !stage.preview, table: { columns: ['id', 'topic', 'text', 'rating'] } },
    }),
  );

  const show = async (group: string): Promise<void> => {
    // The topic's rows among the first twelve ids, so the table's first page shows them too.
    const hits = await rows<{ id: number }>(mosaic.coordinator, `SELECT id FROM "${table}" WHERE topic = '${group}' AND id < 12 ORDER BY id`);
    if (stage.disposed) return;
    const ids = hits.map((h) => h.id);
    // update() skips props that are the same object, so every call passes a new array.
    atlas.update({ highlight: ids });
    info.textContent = `highlight: [${ids.join(', ')}]   (${group} rows among the first twelve)`;
  };
  void show(GROUPS[0]);
  if (stage.bar) {
    select(stage.bar, 'highlight rows of', GROUPS, (g) => void show(g));
    const clear = document.createElement('button');
    clear.className = 'btn';
    clear.textContent = 'highlight: null';
    clear.addEventListener('click', () => {
      atlas.update({ highlight: null });
      info.textContent = 'highlight: null';
    });
    stage.bar.append(clear);
  } else {
    let i = 0;
    stage.every(2200, () => void show(GROUPS[++i % GROUPS.length]!));
  }
  return stage.dispose;
};

export default mount;
