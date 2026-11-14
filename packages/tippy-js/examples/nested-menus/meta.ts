// Tippy.js example: a menu bar whose File menu opens a submenu, both tippies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Menus inside menus',
  summary:
    'A tip can open inside another tip, which is how menus with submenus are built. Open File, point at Export, and a second menu slides out beside it; picking a format closes both.',
  section: 'Overview',
  tags: ['interactive', 'nesting', 'appendTo: parent', 'trigger', 'placement', 'show()', 'hide()'],
  docs: [
    'repo/website/src/pages/index.mdx',
    'repo/website/src/pages/v6/all-props.mdx',
    'repo/website/src/pages/v6/html-content.mdx',
    'repo/website/src/pages/v6/methods.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
