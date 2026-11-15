// cosmos-gl example: Focused point
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Focused point',
  summary:
    'focusedPointIndex puts a ring around one point, drawn in focusedPointRingColor. Setting it to undefined takes the focus away. It is set from code, so it stays put while the pointer moves.',
  section: 'Highlight & focus',
  tags: ['focusedPointIndex', 'focusedPointRingColor', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
