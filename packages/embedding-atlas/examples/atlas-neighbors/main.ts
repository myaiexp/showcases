// data.neighbors: a precomputed { ids, distances } column from createNNDescent
import { createNNDescent, EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, infoPanel, dashboard } from '../../shared/atlas-kit.ts';
import { select } from '../../shared/controls.ts';
import { rows } from '../../shared/mosaic-kit.ts';

const K = 6;

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, {
    hint: 'Pick a row: its stored neighbours are highlighted',
    extra: async (count, points) => {
      // The index is built on the projection here; a real table would index its embeddings.
      const data = new Float32Array(count * 2);
      for (let i = 0; i < count; i++) (data[i * 2] = points.x[i]!), (data[i * 2 + 1] = points.y[i]!);
      const nn = await createNNDescent(count, 2, data, { nNeighbors: 15, seed: 1 });
      const neighbors: { ids: number[]; distances: number[] }[] = [];
      for (let i = 0; i < count; i++) {
        // queryByIndex lists the point itself first; the id column is the row index.
        const r = nn.queryByIndex(i, K + 1);
        neighbors.push({ ids: Array.from(r.indices.slice(1)), distances: Array.from(r.distances.slice(1)) });
      }
      nn.destroy();
      return { neighbors };
    },
  });
  if (stage.disposed) return stage.dispose;

  const atlas = stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text', neighbors: 'neighbors' },
      colorScheme: 'dark',
      // An instances table next to the embedding, so the highlighted rows show where the WebGPU view cannot.
      initialState: dashboard({
        embedding: { type: 'embedding', title: 'Embedding', data: { x: 'x', y: 'y', text: 'text', neighbors: 'neighbors' } },
        rows: { type: 'instances', title: 'Rows', columns: ['id', 'topic', 'text'] },
      }),
    }),
  );

  const info = infoPanel(stage);
  const show = async (id: number): Promise<void> => {
    const [row] = await rows<{ neighbors: { ids: number[]; distances: number[] } }>(
      mosaic.coordinator,
      `SELECT neighbors FROM "${table}" WHERE id = ${id}`,
    );
    if (stage.disposed || !row) return;
    const ids = Array.from(row.neighbors.ids, Number);
    atlas.update({ highlight: [id, ...ids] });
    info.textContent = stage.preview ? `id ${id} → ${ids.join(', ')}` : `id ${id}\nneighbors.ids       ${ids.join(', ')}\nneighbors.distances ${Array.from(row.neighbors.distances, (d) => Number(d).toFixed(2)).join(', ')}`;
  };
  let pick = 12;
  void show(pick);
  if (stage.bar) select(stage.bar, 'row id', ['12', '400', '900', '1500', '2100'], (v) => void show(Number(v)), '12');
  else stage.every(2000, () => void show((pick = (pick * 7 + 131) % 1400)));
  return stage.dispose;
};

export default mount;
