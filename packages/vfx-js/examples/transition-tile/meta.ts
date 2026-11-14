// VFX-JS example: Tile transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile transition",
  summary:
    "Tile splits the old content into tiles that shrink away to reveal the new one. Controls: direction (where the shrinking starts), shape (hex or square), count (tiles along the longer side) and shadow (opacity of the shadow under the tiles).",
  section: "Transition presets",
  tags: ['vfx.addTransition', 'show()', 'Tile', 'direction', 'shape', 'count', 'shadow', 'duration'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/presets.md', 'repo/packages/transitions/src/tile.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
