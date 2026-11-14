// Tippy.js example: a timeline of every lifecycle hook as a tip opens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Everything that happens when a tip opens',
  summary:
    'Hover the button and a log fills with each step of the tip, with its timestamp: triggered, about to show, mounted, fully shown, untriggered, about to hide, hidden. Each step is a hook you can run your own code on.',
  section: 'Props: lifecycle hooks',
  tags: ['onTrigger', 'onShow', 'onMount', 'onShown', 'onUntrigger', 'onHide', 'onHidden', 'delay'],
  docs: ['repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
