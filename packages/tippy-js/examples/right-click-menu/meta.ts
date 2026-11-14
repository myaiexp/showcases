// Tippy.js example: a context menu opened where you right-click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A right-click menu',
  summary:
    'Right-click a file and a small menu opens exactly at the pointer, like in a desktop app. Tippy has no context-menu setting, so the page opens it by hand and tells Tippy where the click happened.',
  section: 'Misc',
  tags: ['contextmenu', 'trigger: manual', 'getReferenceClientRect', 'interactive', 'arrow', 'offset', 'placement'],
  docs: ['repo/website/src/pages/v6/misc.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
