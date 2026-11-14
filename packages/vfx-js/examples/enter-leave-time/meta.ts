// VFX-JS example: animations timed in seconds with enterTime and leaveTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'enterTime and leaveTime',
  summary:
    'enterTime and leaveTime count seconds since the element entered or left the viewport, for animations timed in seconds rather than by progress. The letters wipe in over 1.5 s after entering and fall out after leaving; release: 2 keeps the element drawn for two seconds after it leaves, long enough to see the fall.',
  section: 'Custom Shaders',
  tags: ['enterTime', 'leaveTime', 'release', 'scroll'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'pages/amagi-dev/vfx-js/shaders.md', 'repo/skills/vfx-js/references/shader.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
