// cobe example: labels holding live analytics content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rich label content',
  summary:
    'Five cities carry small analytics cards: a visitor count and a green or red trend arrow, refreshed every second while the globe turns. The cards are ordinary DOM elements anchored with --cobe-{id}, so they can hold any markup.',
  section: 'Custom Labels',
  tags: ['--cobe-{id}', '--cobe-visible-{id}', 'position-anchor', 'markers', 'id'],
  docs: ['repo/website/app/components/CustomLabels.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});
