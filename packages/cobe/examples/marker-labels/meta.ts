// cobe example: Marker labels anchored with CSS Anchor Positioning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Marker labels',
  summary:
    'City names that sit above their markers as the globe turns, and fade out when a city rotates to the back. Each marker gets an id; cobe then exposes an anchor named --cobe-{id} and a --cobe-visible-{id} variable, and an ordinary div uses both.',
  section: 'Custom Labels',
  tags: ['id', 'position-anchor', 'anchor()', '--cobe-{id}', '--cobe-visible-{id}', 'markers'],
  docs: ['repo/website/app/components/CustomLabels.tsx', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
