// d2 example: Container labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Container labels',
  summary:
    'The shorthand `gcloud: Google Cloud { ... }` puts the label before the braces; the other form sets the reserved keyword `label` inside them. Both show the same text on the container.',
  section: 'Containers',
  tags: ['container', 'label'],
  docs: ['repo/docs/tour/containers.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
