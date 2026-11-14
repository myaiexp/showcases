// g6 example: Fullscreen: request and exit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fullscreen: request and exit',
  summary: "The fullscreen plugin's request() and exit() methods, reached through getPluginInstance, expand the graph's box to the screen. Only a click in the full view calls them; the card shows the toolbar icons.",
  section: 'Plugin',
  tags: ['fullscreen', 'request', 'exit', 'getPluginInstance', 'onEnter', 'onExit'],
  docs: ['repo/packages/site/docs/manual/plugin/Fullscreen.en.md', 'repo/packages/site/common/api/plugins/fullscreen.md', 'repo/packages/site/docs/api/plugin.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
