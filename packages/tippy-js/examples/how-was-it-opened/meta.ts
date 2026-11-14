// Tippy.js example: onTrigger reports mouse, keyboard or click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mouse, keyboard or click?',
  summary:
    'One button opens its tip on hover, on keyboard focus and on click. The trigger hook receives the event that started it, so the tip can tell you how it was opened.',
  section: 'Props: lifecycle hooks',
  tags: ['onTrigger', 'trigger', 'event.type', 'setContent()'],
  docs: ['repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
