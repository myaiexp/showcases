// Sigma.js example: runtime performance switches on a large graph
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Large graph performance switches',
  summary:
    'A graph with about 20,000 edges and three settings that trade looks for speed: antialiasEdges, hideEdgesOnMove and hideLabelsOnMove, flipped at runtime with setSetting.',
  section: 'Technical guides',
  tags: ['performance', 'antialiasEdges', 'hideEdgesOnMove', 'setSetting'],
  docs: [`${DOCS}/how-to/technical/performance.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
