// tanstack-charts example: Group-centre anchor stops tooltip jumping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group-centre anchor stops tooltip jumping',
  summary:
    'With grouped focus the point anchor hops between series. anchor group-center uses the middle of the focused points bounding box, so the tooltip moves only with the month.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.anchor', 'group-center', 'group-x', 'placement'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
