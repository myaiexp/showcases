// tanstack-charts example: Portal out of a clipped container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Portal out of a clipped container',
  summary:
    'A short chart inside an overflow-hidden box cannot show a tall grouped tooltip above its plot. Adding the portal extension opens the tooltip in the browser top layer, positioned against the viewport, so it escapes the clip.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.portal', 'anchor', 'group-x', 'placement'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
