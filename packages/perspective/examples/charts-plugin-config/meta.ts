// Perspective example: chart plugin_config settings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart plugin_config',
  summary: 'plugin_config carries chart-wide settings that are not part of the query: overlay or grid facets for split_by, legend placement, a zero baseline for the value axis, and line width.',
  section: 'Charts',
  tags: ['plugin_config', 'facet_mode', 'legend_mode', 'include_zero', 'line_width_px', 'WebGL'],
  docs: ['repo/packages/viewer-charts/README.md', 'repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
