// galacean example: Particle sheet single row
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle sheet single row",
  summary:
    "The same sheet animated as WholeSheet (all rows) and as SingleRow (one row only); a select swaps the right one in the full view. TextureSheetAnimationType is not exported by the package, so the values 0 and 1 are used.",
  section: "Particle",
  tags: ['textureSheetAnimation', 'TextureSheetAnimationType', 'tiling'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-animation-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
