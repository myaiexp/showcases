// tsl-textures example: Runny eggs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Runny eggs',
  summary:
    'runnyEggs() on three slots at once: colorNode for the yolks, whites and plate, runnyEggs.normal() on normalNode for their relief, and runnyEggs.roughness() on roughnessNode so yolks shine and whites do not. One options object feeds all three.',
  section: 'Textures',
  tags: ['runnyEggs', 'colorNode', 'normalNode', 'roughnessNode', 'tangents'],
  docs: ['repo/docs/runny-eggs.md', 'repo/src/runny-eggs.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
