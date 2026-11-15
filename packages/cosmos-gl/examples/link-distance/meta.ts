// cosmos-gl example: Link distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link distance',
  summary:
    'simulationLinkDistance is the length a link tries to settle at, from 1 to 20 space units. A mesh of short links packs close, one of long links spreads out. The slider changes it live.',
  section: 'Simulation forces',
  tags: ['simulationLinkDistance', 'setConfigPartial', 'start'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
