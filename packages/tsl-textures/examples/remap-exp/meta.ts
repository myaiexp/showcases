// tsl-textures example: remapExp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'remapExp',
  summary:
    'remapExp() maps a range like the TSL remap() but exponentially: equal steps in the input become equal ratios in the output. Striped by whole values of the mapped height, the bands stay even with remap, while with remapExp they are widest at toMin and narrow toward toMax.',
  section: 'Utilities',
  tags: ['remapExp', 'remap', 'exponential', 'stripes'],
  docs: ['repo/src/tsl-utils.js', 'repo/src/tsl-textures.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
