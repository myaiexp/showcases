// Tippy.js example: a plugin that keeps every tip so one call can restyle them all
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Change every tip at once',
  summary:
    'A dashboard with a tip on every number. A small plugin remembers each tip as it is created, so one updateAll() call switches the look and the side of all of them together.',
  section: 'Plugins',
  tags: ['plugins', 'globalStore', 'setProps()', 'theme', 'placement', 'onCreate', 'onDestroy'],
  docs: ['repo/website/src/pages/v6/plugins.mdx', 'repo/website/src/pages/v6/themes.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
