// A count-plot chart spec: limit, labels, order, in a dashboard layout
import { EmbeddingAtlas } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { docsTable } from '../../shared/table.ts';

const VARIANTS = {
  'labels: "#"': { labels: '#' },
  'labels: "%"': { labels: '%' },
  'order: "alphabetical"': { order: 'alphabetical', labels: '#' },
  'limit: 3': { limit: 3, labels: '#/#' },
} as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420, cardZoom: 0.5 });
  const mosaic = await stage.mosaic();
  const { table } = await docsTable(mosaic, { count: 3000 });
  if (stage.disposed) return stage.dispose;

  stage.variants('Count plot', Object.keys(VARIANTS), (name, host) => {
    const options = VARIANTS[name as keyof typeof VARIANTS];
    return new EmbeddingAtlas(host, {
      coordinator: mosaic.coordinator,
      data: { table, id: 'id' },
      colorScheme: 'dark',
      initialState: {
        charts: {
          topics: { type: 'count-plot', title: `Topics, ${name}`, data: { field: 'topic' }, ...options },
        },
        layouts: {
          main: {
            type: 'dashboard',
            name: 'Count plot',
            chartIds: ['topics'],
            grids: { '24x18': { placements: { topics: { x: 0, y: 0, width: 24, height: 18 } } } },
          },
        },
        layoutOrder: ['main'],
        currentLayout: 'main',
      },
    });
  });
  return stage.dispose;
};

export default mount;
