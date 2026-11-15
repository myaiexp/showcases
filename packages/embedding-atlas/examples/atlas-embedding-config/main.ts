// embeddingViewConfig: density mode, point size, minimum density, auto labels
import { EmbeddingAtlas, type EmbeddingAtlasProps } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, infoPanel, topicChart } from '../../shared/atlas-kit.ts';

type Config = NonNullable<EmbeddingAtlasProps['embeddingViewConfig']>;

const VARIANTS: Record<string, Config> = {
  'mode: points': { mode: 'points' },
  'mode: density': { mode: 'density' },
  'pointSize: 4': { mode: 'points', pointSize: 4 },
  'minimumDensity: 0.1': { mode: 'density', minimumDensity: 0.1 },
  'autoLabelEnabled: false': { autoLabelEnabled: false },
  'downsampleMaxPoints: 500': { downsampleMaxPoints: 500 },
};

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table } = await atlasSetup(el, ctx, { height: 480, hint: 'The embedding panel needs WebGPU (shader-f16)' });
  if (stage.disposed) return stage.dispose;
  const info = infoPanel(stage);

  stage.variants('embeddingViewConfig', Object.keys(VARIANTS), (name, host) => {
    const config = VARIANTS[name]!;
    info.textContent = `embeddingViewConfig: ${JSON.stringify(config)}`;
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      embeddingViewConfig: config,
      // Only the embedding and one chart, so the view gets most of the space.
      initialState: dashboard({ embedding: { type: 'embedding', title: 'Embedding', data: { x: 'x', y: 'y', text: 'text' } }, topics: topicChart }),
    });
  });
  return stage.dispose;
};

export default mount;
