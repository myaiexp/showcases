// Vizzu example: config.orientation chooses which axis the markers grow along when both axes hold measures
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Orientation with two measures',
  summary:
    'When both axes hold measures, Vizzu cannot tell which way a marker should point, and config.orientation decides. Here each country is a thin area marker at its Income (x) and Online share (y). "horizontal" draws it as a vertical stroke standing on the x-axis, and "vertical" as a horizontal stroke reaching in from the y-axis. The chart starts on "auto".',
  section: 'Orientation, split & polar',
  tags: ['orientation', 'horizontal', 'vertical', 'auto'],
  docs: ['repo/docs/tutorial/orientation_split_polar.md', 'repo/src/apps/weblib/typeschema-api/config.yaml'],
  provenance: 'pure',
  added: '2026-11-15',
});
