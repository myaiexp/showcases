// embedding-atlas example: replacing or removing the status bar's branding link
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Branding link',
  summary:
    'The status bar ends in a link to Embedding Atlas. theme.brandingLink { text, href } points it somewhere else (here, back to this gallery) and null removes it.',
  section: 'Theme',
  tags: ['theme', 'brandingLink', 'statusBar'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/theme.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
