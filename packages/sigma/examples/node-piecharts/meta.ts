// Sigma.js example: nodes drawn as pie charts with layerPiechart
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Piechart nodes',
  summary:
    'layerPiechart from @sigma/node-piechart turns attributes into pie slices, with a rotating offset and a default colour when every value is zero. Values drift over time.',
  section: 'Styling nodes',
  tags: ['layers', 'piechart', '@sigma/node-piechart', 'offset'],
  docs: [`${DOCS}/how-to/nodes/fill-layers.mdx`, 'repo/packages/node-piechart/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
