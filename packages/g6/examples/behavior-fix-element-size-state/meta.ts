// g6 example: Fix element size: state and filters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fix element size: state and filters',
  summary: 'state limits fix-element-size to elements in a state and nodeFilter to nodes passing a test; reset restores styles when elements are redrawn. The card zooms out under each limit.',
  section: 'Behavior',
  tags: ['fix-element-size', 'state', 'nodeFilter', 'reset'],
  docs: ['repo/packages/site/docs/manual/behavior/FixElementSize.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
