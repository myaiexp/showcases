// Tippy.js example: one tip that slides from step to step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One tip that glides',
  summary:
    'A checkout progress bar with a single "You are here" tip. When the shopper moves to the next step the same tip slides across to it instead of vanishing and reappearing.',
  section: 'Props: position',
  tags: ['moveTransition', 'getReferenceClientRect', 'setProps', 'showOnCreate', 'trigger: manual'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/methods.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
