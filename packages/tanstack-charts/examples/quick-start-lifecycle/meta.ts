// tanstack-charts example: Mount, update, resize, destroy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mount, update, resize, destroy',
  summary:
    'The quick start lifecycle on a revenue line. Next dataset passes a new definition to host.update and Taller passes new host options; the readout shows the current scene. Cards cycle the datasets with an animated update.',
  section: 'Quick Start',
  tags: ['mountChart', 'host.update', 'host.destroy', 'svgAnimation', 'getScene'],
  docs: ['repo/docs/quick-start.md', 'repo/docs/concepts/chart-definitions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
