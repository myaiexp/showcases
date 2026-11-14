// Tippy.js example: each help icon carries its own tip settings as attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Each tip configured in the HTML',
  summary:
    'Settings can sit on the element itself as data-tippy-* attributes. In this form every help icon chooses where its tip goes, whether it has an arrow and how long it waits, yet one call sets up all four.',
  section: 'Customization',
  tags: ['data-tippy-placement', 'data-tippy-arrow', 'data-tippy-delay', 'data-tippy-content', 'tippy()'],
  docs: ['repo/website/src/pages/v6/customization.mdx', 'repo/website/src/pages/v6/constructor.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
