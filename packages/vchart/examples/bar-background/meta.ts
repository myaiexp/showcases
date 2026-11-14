// vchart example: Bar: barBackground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: barBackground',
  summary:
    'The barBackground mark is invisible by default; making it visible draws a track behind each bar. fieldLevel moves the track from each bar to the whole group.',
  section: 'Bar',
  tags: ['barBackground', 'barBackground.fieldLevel', 'barBackground.style'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
