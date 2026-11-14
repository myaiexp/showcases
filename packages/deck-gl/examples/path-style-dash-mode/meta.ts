// deck-gl example: PathStyleExtension dashMode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathStyleExtension dashMode',
  summary:
    "dashMode 'segment' restarts the pattern at every vertex, so dense paths look solid; 'path' runs one pattern along the whole path. Switch between them on 40-vertex routes.",
  section: 'Extensions',
  tags: ['PathStyleExtension', 'dashMode', 'getDashArray'],
  docs: [
    'repo/docs/api-reference/extensions/path-style-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
