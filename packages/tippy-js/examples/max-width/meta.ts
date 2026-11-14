// Tippy.js example: capping how wide a long tip can grow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keeping long tips readable',
  summary:
    'Long text in a tip can stretch into a line nobody wants to read. By default a tip stops growing at 350 pixels and wraps; you can make that narrower, remove the limit, or try your own width with the slider.',
  section: 'Props: look',
  tags: ['maxWidth', 'setProps', 'content'],
  docs: ['repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
