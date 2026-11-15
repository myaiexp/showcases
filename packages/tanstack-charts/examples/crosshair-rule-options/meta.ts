// tanstack-charts example: Crosshair rules, labels and marker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair rules, labels and marker',
  summary:
    'A crosshair has an x and a y guide that are on by default, labels and a marker that are off, and shared rule options such as dash and opacity that an axis can override. Tick the boxes to switch each part and see the focused point drive them. The card cycles four combinations.',
  section: 'Focus and Interaction',
  tags: ['crosshair', 'strokeDasharray', 'label', 'marker', 'CrosshairAxisOptions'],
  docs: ['repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
