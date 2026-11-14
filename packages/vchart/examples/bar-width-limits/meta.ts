// vchart example: Bar: barWidth, barMinWidth, barMaxWidth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: barWidth, barMinWidth, barMaxWidth',
  summary:
    'barWidth fixes the column width in pixels or as a percentage of the band, while barMinWidth and barMaxWidth clamp the automatic width. A select switches between the settings.',
  section: 'Bar',
  tags: ['barWidth', 'barMinWidth', 'barMaxWidth'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
