// embedding-atlas example: per-scheme theme overrides under light and dark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Light and dark theme overrides',
  summary:
    'A theme can carry light and dark blocks next to its shared settings, and the view applies the block that matches config.colorScheme. Flipping the scheme swaps orange-brown labels for pale orange ones without passing a new theme.',
  section: 'Theme',
  tags: ['theme', 'light', 'dark', 'colorScheme', 'clusterLabelColor'],
  docs: ['pages/apple-github-io/embedding-atlas/embedding-view.md', 'repo/packages/component/src/lib/embedding_view/theme.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
