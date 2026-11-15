// data.features: a features-list chart made from a list-of-text column
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, infoPanel } from '../../shared/atlas-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 520 });
  if (stage.disposed) return stage.dispose;
  infoPanel(stage, 'data.features names the column; Atlas adds a Features list and leaves it out of the count plots');

  const columns: Record<string, string | null> = { 'features: "tags"': 'tags', 'features: null': null };
  stage.variants('data.features', Object.keys(columns), (name, host) => {
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text', features: columns[name]! },
      colorScheme: 'dark',
      // Cards give the Features list the room of the embedding panel and the table.
      defaultChartsConfig: { include: ['tags', 'topic', 'rating'], ...(stage.preview ? { embedding: false, table: false } : {}) },
    });
  });
  return stage.dispose;
};

export default mount;
