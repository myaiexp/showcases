// tsl-textures example: Blending two textures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blending two textures',
  summary:
    "A texture function returns an ordinary TSL node, so marble() and wood() can be mixed like any colours: TSL's mix() blends them by a smoothstep mask on positionGeometry.y that sweeps up and down with time.",
  section: 'Getting started',
  tags: ['mix', 'smoothstep', 'marble', 'wood', 'colorNode'],
  docs: ['repo/docs/marble.md', 'repo/docs/wood.md', 'repo/src/marble.js', 'repo/src/wood.js', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
