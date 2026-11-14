// Tippy.js example: Switching a singleton between two toolbars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switching toolbars',
  summary:
    'View mode and Edit mode show different toolbars, yet one tip box serves whichever is on screen. Switching mode hands the box to the other set of buttons.',
  section: 'Addons',
  tags: ['createSingleton', 'setInstances()', 'moveTransition'],
  docs: ['repo/website/src/pages/v6/addons.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
