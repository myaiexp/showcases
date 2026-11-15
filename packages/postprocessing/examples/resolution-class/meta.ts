// postprocessing example: how Resolution derives an effective size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resolution: scale and preferred size',
  summary:
    'A Resolution turns a base size (here 1280 x 720) into an effective width and height. A `scale` multiplies it; a `preferredWidth` or `preferredHeight` replaces it, and AUTO_SIZE (-1) on the other side keeps the aspect ratio. Setting `scale` resets both preferred sizes to AUTO_SIZE. The outline is the base, the gold box the result.',
  section: 'Utilities',
  tags: ['Resolution', 'scale', 'preferredWidth', 'preferredHeight', 'AUTO_SIZE', 'setBaseSize', 'setPreferredSize'],
  docs: ['repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
