// Sigma.js example: declarative styles instead of build-time colour and size
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Style the graph declaratively',
  summary:
    'The graph stores only raw cluster and score attributes. DEFAULT_STYLES plus a categorical colour binding and a numerical size binding do the visual mapping.',
  section: 'Get started',
  tags: ['styles', 'DEFAULT_STYLES', 'categorical binding', 'numerical binding'],
  docs: [
    `${DOCS}/get-started/style-the-graph.mdx`,
    `${DOCS}/reference/style-value-types.md`,
    `${DOCS}/reference/camera-api.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
