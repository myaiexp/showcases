// cosmos-gl example: Gravity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gravity',
  summary:
    'simulationGravity pulls every point toward the middle of the space. At 0 a tree of links spreads out under repulsion alone, at 1 it packs into a tight ball. The slider changes the value live and restarts the layout.',
  section: 'Simulation forces',
  tags: ['simulationGravity', 'setConfigPartial', 'start'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
