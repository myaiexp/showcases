// tanstack-charts example: Two radius scales
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Two radius scales",
  summary:
    "polar scales accept extra named entries. The tickets scale declares channel 'radius' and a 0 to 40 domain, and the marks that set radiusScale: 'tickets' use it while the others keep the default 0 to 100 radius scale, so two units share one radar.",
  section: "Polar Marks",
  tags: ['polar', 'scales', 'radiusScale', 'channel', 'radialLine', 'radialDot'],
  docs: ['repo/docs/reference/marks/polar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
