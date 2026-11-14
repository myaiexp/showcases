// Tippy.js example: Tips on things that are not buttons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tips on things that aren\'t buttons',
  summary:
    'Abbreviations in a paragraph explain themselves on hover, and also when you Tab to them, because each one was made focusable with tabindex. A line under the text says which way the last tip was opened.',
  section: 'Accessibility',
  tags: ['trigger', 'tabindex', 'onTrigger', 'focus'],
  docs: ['repo/website/src/pages/v6/accessibility.mdx', 'repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
