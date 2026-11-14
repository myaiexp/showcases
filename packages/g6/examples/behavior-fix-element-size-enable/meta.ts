// g6 example: Fix element size: enable by scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fix element size: enable by scale',
  summary: 'enable as a function of event.data.scale holds element sizes only when zoomed out, only when zoomed in, or always. The card zooms out and in under each rule.',
  section: 'Behavior',
  tags: ['fix-element-size', 'enable', 'scale'],
  docs: ['repo/packages/site/docs/manual/behavior/FixElementSize.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
