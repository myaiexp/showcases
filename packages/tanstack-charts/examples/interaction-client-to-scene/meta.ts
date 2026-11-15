// tanstack-charts example: Client coordinates to scene coordinates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Client coordinates to scene coordinates',
  summary:
    'host.interaction converts browser client coordinates into the chart scene with clientToScene, and resolves them to the primary point and focus group with resolvePointer. The readout shows each value as the pointer moves, which is the toolkit an application-owned gesture builds on.',
  section: 'Focus and Interaction',
  tags: ['interaction.clientToScene', 'interaction.resolvePointer', 'host.interaction', 'ChartPointerResolution'],
  docs: ['repo/docs/reference/focus-and-interaction.md', 'repo/docs/guides/interactions-and-selections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
