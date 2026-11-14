// vchart example: Bar: barMinHeight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: barMinHeight',
  summary:
    'A tiny value would draw an invisible bar; barMinHeight keeps every bar at least that many pixels tall. A slider raises the minimum and the near-zero bars grow to meet it.',
  section: 'Bar',
  tags: ['barMinHeight'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Bar.md',
    'repo/docs/assets/option/en/series/bar-style.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
