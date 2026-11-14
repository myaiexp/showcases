// deck-gl example: Icons from generated SVG data URLs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Icons from generated SVG data URLs',
  summary:
    "An IconLayer whose getIcon returns a data URL built from an SVG string, one badge per count with a 10+ cap. Each distinct URL is auto-packed into an atlas, with no files or network involved. Change the counts to build new icons.",
  section: 'Data and performance',
  tags: ['IconLayer', 'getIcon', 'SVG', 'data URL', 'auto-packing'],
  docs: [
    'repo/docs/developer-guide/loading-data.md',
    'repo/docs/api-reference/layers/icon-layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
