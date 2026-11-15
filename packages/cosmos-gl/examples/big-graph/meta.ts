// cosmos-gl example: Big graph
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Big graph',
  summary:
    'A clustered graph with as many links as points, from 3,000 up to 250,000 of each. The layout runs on the GPU at every size and showFPSMonitor shows the frame rate. The data is built in typed-array loops and the caption states the exact counts and the upload time.',
  section: 'Performance',
  tags: ['showFPSMonitor', 'setPointPositions', 'setLinks', 'linkOpacity', 'fitView'],
  docs: [
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
