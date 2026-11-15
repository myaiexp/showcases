// embedding-atlas example: colorScheme light and dark, via update()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Light and dark Atlas',
  summary:
    'The same dashboard in colorScheme "light" and "dark". The select calls atlas.update({ colorScheme }) on the live component, so the charts, table and panels restyle without a remount.',
  section: 'EmbeddingAtlas',
  tags: ['colorScheme', 'update', 'new EmbeddingAtlas'],
  docs: ['repo/packages/viewer/src/api.ts', 'repo/packages/docs/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
