// cosmos-gl example: Occlusion culling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Occlusion culling',
  summary:
    'With a few thousand large opaque points stacked on each other, most fragments are hidden. pointOcclusionCulling (on by default) skips shading them, which raises the frame rate with an identical picture; it switches itself off when pointOpacity is below 1.',
  section: 'Point styling',
  tags: ['pointOcclusionCulling', 'showFPSMonitor', 'pointOpacity'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/history/2026/2026-07-07-point-occlusion-culling.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
