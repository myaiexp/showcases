// aframe example: before and after: ordering tick handlers between components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'before and after: ordering tick handlers between components',
  summary:
    'foo is registered first but declares after: [\'bar\'], and bar declares before: [\'foo\']. Three boxes use them alone and together; the board prints the tick order of the last frame, which is always bar then foo.',
  section: 'Core API',
  tags: ['before', 'after', 'tick order'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
