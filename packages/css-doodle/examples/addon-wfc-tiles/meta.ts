// wfc's tiled model: tiles with side labels, turned by @wfc.turn()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Wave function collapse with tiles',
  summary:
    'The tiled model from the addons guide: three tiles (a straight rope, a corner and a crossing), each a CSS gradient with the labels of its four sides. Every turn of a tile is tried, and @wfc.turn() gives each cell the rotation it needs, so the ropes join up and the crossing puts one or the other on top.',
  section: 'Addons',
  tags: ["wfc", "@wfc.tiles", "@wfc.turn", "linear-gradient", "radial-gradient"],
  docs: ["pages/css-doodle-com/addons.md", "repo/src/wfc/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
