// g6 example: Toolbar: items loaded asynchronously
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Toolbar: items loaded asynchronously',
  summary: "getItems may return a Promise, so the toolbar can wait for its items. A stand-in delay replaces the docs' fetch; updatePlugin swaps in another getItems.",
  section: 'Plugin',
  tags: ['toolbar', 'getItems', 'Promise', 'updatePlugin'],
  docs: ['repo/packages/site/docs/manual/plugin/Toolbar.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
