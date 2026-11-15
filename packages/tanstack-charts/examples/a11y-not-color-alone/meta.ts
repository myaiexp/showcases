// tanstack-charts example: Not color alone
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Not color alone',
  summary:
    'Three series carry a second signal besides color: each line has its own dash pattern and a direct label at its end. The toggle turns those cues off to show what a reader with limited color vision would otherwise face.',
  section: 'Accessibility',
  tags: ['strokeDasharray', 'text', 'direct labels', 'z'],
  docs: ['repo/docs/guides/accessibility.md', 'repo/docs/guides/legends-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
