// VFX-JS example: Tile: shape, direction and count change the look
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile: shape, direction and count change the look",
  summary:
    "The same Tile preset looks very different with other params: large hexagons shrinking from the center, a square grid sweeping to the left, a fine grid sweeping down, a few huge tiles. The card cycles through four looks; the full view picks one, and lets you change each param on top.",
  section: "Transition presets",
  tags: ['Tile', 'shape', 'direction', 'count', 'shadow', 'vfx.addTransition', 'show()'],
  docs: ['repo/docs/TRANSITION.md', 'repo/packages/transitions/src/tile.ts', 'pages/amagi-dev/vfx-js-transitions/presets.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
