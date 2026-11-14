// vchart example: Bar: gradient and rounded corners
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: gradient and rounded corners',
  summary:
    'bar.style.fill takes a linear gradient object and bar.style.cornerRadius rounds the bars. A slider changes the radius, and a gradient colour stop comes from a callback per datum.',
  section: 'Bar',
  tags: ['bar.style.fill', 'gradient', 'cornerRadius', 'bandPadding'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
