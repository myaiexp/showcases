// embeddingViewLabels: your own cluster labels on the embedding panel
import { EmbeddingAtlas, type Label } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { atlasSetup, dashboard, infoPanel, topicChart } from '../../shared/atlas-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, mosaic, table, points } = await atlasSetup(el, ctx, { hint: 'The embedding panel needs WebGPU (shader-f16)' });
  if (stage.disposed) return stage.dispose;

  // One label per topic at its blob centre, upper-case, plus a finer level-1 label per topic
  // offset a little so it only shows once zoomed in.
  const labels: Label[] = points.names.flatMap((name, i): Label[] => {
    const [x, y] = points.centres[i]!.map((v) => Math.round(v * 100) / 100) as [number, number];
    return [
      { x, y, content: name.toUpperCase(), level: 0, priority: 2 },
      { x: x + 1.2, y: y - 1.2, content: `${name} detail`, level: 1, priority: 1 },
    ];
  });
  infoPanel(stage, JSON.stringify(labels.slice(0, 2)));

  stage.own(
    new EmbeddingAtlas(stage.view, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id', projection: { x: 'x', y: 'y' }, text: 'text' },
      colorScheme: 'dark',
      embeddingViewLabels: labels,
      embeddingViewConfig: { autoLabelEnabled: false },
      initialState: dashboard({ embedding: { type: 'embedding', title: 'Embedding', data: { x: 'x', y: 'y', text: 'text' } }, topics: topicChart }),
    }),
  );
  return stage.dispose;
};

export default mount;
