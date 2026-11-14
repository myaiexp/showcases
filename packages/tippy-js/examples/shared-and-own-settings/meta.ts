// Tippy.js example: one call for shared tip settings, attributes for the exceptions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shared settings, with exceptions',
  summary:
    'Set the common behaviour once in the call, and let single elements differ through attributes. Here every tool in a photo editor opens a "Pro plan" note on click, except Crop, which has its own text, and Filters, which has no arrow.',
  section: 'Customization',
  tags: ['trigger: click', 'content', 'data-tippy-content', 'data-tippy-arrow', 'tippy()'],
  docs: ['repo/website/src/pages/v6/customization.mdx', 'repo/website/src/pages/v6/constructor.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
