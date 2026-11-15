// vega example: View: Parse Config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: Parsing with a Config',
  summary:
    'One colourless bar chart parsed three times: with the dark config, with a merged config that changes the categorical palette and grid, and as a spec carrying its own config, which takes precedence over the one given to parse.',
  section: 'View API',
  tags: ['parser.parse', 'config.range', 'config.axis', 'util.mergeConfig'],
  docs: ['repo/docs/docs/api/parser.md', 'repo/docs/docs/api/util.md', 'repo/docs/docs/config.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
