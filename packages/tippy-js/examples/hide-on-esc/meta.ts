// Tippy.js example: a click-opened panel that closes on the Escape key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Escape closes it',
  summary:
    'A Filters panel opens on click. A tiny plugin listens for the Escape key while the panel is open and hides it, which keyboard users expect from any pop-up. A second button without the plugin ignores Escape.',
  section: 'Plugins',
  tags: ['plugins', 'hideOnEsc', 'trigger', 'interactive', 'hide()'],
  docs: ['repo/website/src/pages/v6/plugins.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
