// Tippy.js example: reading tippy.currentInput and a double-tap wrapper for touch screens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Knowing touch from mouse',
  summary:
    'Tippy keeps track of whether you are using a finger or a mouse. A Delete button uses that: with a mouse one click deletes, with a finger the first tap only shows what the button does and the second tap deletes.',
  section: 'Misc',
  tags: ['tippy.currentInput', 'isTouch', 'tippy()', 'show()', 'hover'],
  docs: ['repo/website/src/pages/v6/misc.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
