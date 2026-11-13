// babylon-js example: GreasedLine: widths, colours, dashes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GreasedLine: widths, colours, dashes',
  summary:
    'CreateGreasedLine draws a spiral as a camera-facing triangle mesh from a flat points array. Per-point widths taper the start (WIDTH_DISTRIBUTION_START fills the rest), four colours are spread EVEN with linear sampling, dashOffset scrolls the dashes and visibility draws the line on. Width, dash ratio and sizeAttenuation are live material settings.',
  section: 'Mesh',
  tags: ['CreateGreasedLine', 'GreasedLineMeshWidthDistribution', 'colorDistribution', 'dashOffset', 'visibility'],
  docs: ['repo/content/features/featuresDeepDive/mesh/creation/param/greased_line.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
