// Fuse.js example: a shop search that finds typos but not descriptions of what you want
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'It matches letters, not meaning',
  summary:
    'What Fuse.js is for and what it is not for. Type a product name badly ("mackbook", "keybord") and the shop finds it. Describe what you want ("warm jacket") and it finds nothing, though a parka is right there: Fuse compares characters, it does not understand words.',
  section: 'Articles',
  tags: ['new Fuse', 'search', 'keys', 'threshold', 'semantic search'],
  docs: ['repo/docs/articles/vs-semantic-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
