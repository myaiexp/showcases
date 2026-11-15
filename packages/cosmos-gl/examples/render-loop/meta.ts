// cosmos-gl example: Host-driven render loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Host-driven render loop',
  summary:
    'With enableRenderLoop false cosmos.gl never schedules its own frames: the page calls step() to advance the layout and renderOneFrame() to draw. This example runs that loop itself on requestAnimationFrame and counts the calls, and can hold it back to show that nothing moves without them.',
  section: 'Simulation control',
  tags: ['enableRenderLoop', 'step', 'renderOneFrame'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/docs/host-embedding/README.md', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
