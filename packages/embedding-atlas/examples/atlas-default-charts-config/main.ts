// defaultChartsConfig: include, exclude, override, table and embedding switches
import { EmbeddingAtlas, type EmbeddingAtlasProps } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, infoPanel } from '../../shared/atlas-kit.ts';

type Config = NonNullable<EmbeddingAtlasProps['defaultChartsConfig']>;

const VARIANTS: Record<string, Config> = {
  'include: topic, source, rating': { include: ['topic', 'source', 'rating'] },
  'exclude: tags, published, score': { exclude: ['tags', 'published', 'score'] },
  'override: a null and a spec': {
    include: ['topic', 'source', 'words'],
    override: {
      source: null,
      words: { type: 'count-plot', title: 'words, as categories', data: { field: 'words' }, limit: 6 },
    },
  },
  'table: false': { include: ['topic', 'rating'], table: false },
  'table: { columns }': { include: ['topic', 'rating'], table: { title: 'Three columns', columns: ['topic', 'words', 'score'] } },
  'embedding: false': { include: ['topic', 'rating'], embedding: false },
};

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 520 });
  if (stage.disposed) return stage.dispose;
  const info = infoPanel(stage);

  stage.variants('defaultChartsConfig', Object.keys(VARIANTS), (name, host) => {
    const config = VARIANTS[name]!;
    info.textContent = `defaultChartsConfig: ${JSON.stringify(config)}`;
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      defaultChartsConfig: config,
    });
  });
  return stage.dispose;
};

export default mount;
