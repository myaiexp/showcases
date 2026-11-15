// postprocessing example: SelectiveBloomEffect inverted and ignoreBackground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selective bloom: inverted selection',
  summary:
    'The same selection of rings, with SelectiveBloomEffect.inverted flipped: now everything except the rings is allowed to bloom. ignoreBackground keeps pixels at the far plane out of the glow.',
  section: 'Bloom',
  tags: ['SelectiveBloomEffect', 'Selection', 'inverted', 'ignoreBackground'],
  docs: ['repo/README.md', 'repo/src/effects/SelectiveBloomEffect.js', 'repo/src/core/Selection.js', 'repo/src/effects/BloomEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
