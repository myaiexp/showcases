// g6 example: Contextmenu: async content and loading state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Contextmenu: async content and loading state',
  summary: "getContent may return a Promise: loadingContent shows while it settles, then the resolved HTML replaces it. A timer stands in for the docs' fetch.",
  section: 'Plugin',
  tags: ['contextmenu', 'getContent', 'loadingContent', 'className'],
  docs: ['repo/packages/site/docs/manual/plugin/Contextmenu.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
