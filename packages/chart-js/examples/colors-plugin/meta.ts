// Chart.js example: Automatic colours from the Colors plugin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic colours from the Colors plugin',
  summary:
    'Datasets with no colours of their own get a palette from the Colors plugin: one colour per line or bar, one per slice in a doughnut. Switch plugins.colors.enabled off to see what the same chart looks like without it.',
  section: 'General',
  tags: ['colors', 'plugin', 'palette', 'forceOverride'],
  docs: ['repo/docs/general/colors.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
