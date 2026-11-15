// force-graph example: Interaction: linkPointerAreaPaint
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: linkPointerAreaPaint',
  summary:
    'linkPointerAreaPaint paints the band that counts as the link for hover. A wide stroke lets the pointer rest beside a link and still hover it; the thin default band does not reach it.',
  section: 'Interaction',
  tags: ['linkPointerAreaPaint', 'onLinkHover', 'linkCanvasObject', 'linkCanvasObjectMode'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
