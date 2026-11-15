// penrose example: resample: four variations of one trio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'resample: four variations of one trio',
  summary:
    'One compiled trio, four layouts, like the editor\'s Diagram Variations panel. Each cell copies the state with a new `variation` string, `resample`s it (which draws every sampled value again from that seed) and optimizes. Same points and links, different solutions.',
  section: 'Language API',
  tags: ['resample', 'variation', 'optimize'],
  docs: [
    'repo/packages/docs-site/docs/ref/using.md',
    'repo/packages/core/src/index.ts',
    'repo/packages/docs-site/docs/ref/api.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
