// embedding-atlas example: stylesheet CSS inside the shadow root
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom stylesheet',
  summary:
    'Atlas renders inside a shadow root, so the page\'s CSS cannot restyle it. The stylesheet prop is a CSS string adopted into that root after Atlas\'s own sheet. The select applies a serif font with round buttons, a monospace font, and a tinted background.',
  section: 'EmbeddingAtlas',
  tags: ['stylesheet', 'shadow root'],
  docs: ['repo/packages/viewer/src/api.ts', 'pages/apple-github-io/embedding-atlas/embedding-atlas.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
