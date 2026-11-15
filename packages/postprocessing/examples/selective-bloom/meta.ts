// postprocessing example: SelectiveBloomEffect and its Selection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selective bloom',
  summary:
    'A SelectiveBloomEffect blooms only the meshes in its selection. With the luminance threshold at 0 every object is bright enough, so the glow follows the Selection: add or delete the rings and the pillars and only those halos appear.',
  section: 'Bloom',
  tags: ['SelectiveBloomEffect', 'Selection', 'selection', 'add', 'delete', 'set', 'luminanceThreshold'],
  docs: ['repo/README.md', 'repo/src/effects/SelectiveBloomEffect.js', 'repo/src/core/Selection.js', 'repo/src/effects/BloomEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
