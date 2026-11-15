// tanstack-charts example: Application-owned inspection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Application-owned inspection',
  summary:
    'With pointer false the chart ignores pointer movement, and the application decides when inspection happens. Here focus follows the pointer only while the button is held, using resolvePointer and setControlledFocus on host.interaction, so the focus ring and tooltip still come from the definition.',
  section: 'Tooltips and Focus',
  tags: ['pointer', 'host.interaction', 'resolvePointer', 'setControlledFocus'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
