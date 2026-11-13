// mermaid example: frontmatter title and per-diagram config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Frontmatter title and per-diagram config',
  summary:
    'A YAML block between `---` lines reconfigures one diagram before it renders: a title, a theme, a look, or diagram-specific options.',
  section: 'Introduction',
  tags: ['frontmatter', 'title', 'config', 'theme', 'look', 'comments'],
  docs: [
    'repo/packages/mermaid/src/docs/intro/syntax-reference.md',
    'repo/packages/mermaid/src/docs/intro/getting-started.md',
    'repo/packages/mermaid/src/docs/intro/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
