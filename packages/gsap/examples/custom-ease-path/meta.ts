// GSAP example: CustomEase.create() from SVG path data, drawn back with getSVGData()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CustomEase from a path',
  summary:
    'Edit an SVG path (or a cubic-bezier string) and CustomEase.create() turns it into a named ease. getSVGData() redraws the curve and a ball hops along it.',
  section: 'Custom eases',
  tags: ['CustomEase', 'create', 'getSVGData', 'ease', 'svg path'],
  docs: ['pages/gsap-com/docs/v3/Eases/CustomEase.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
