// tanstack-charts example: Weighted observations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Weighted observations",
  summary:
    "The weight channel scales each observation's contribution. Giving the Gentoo rows a weight of three pulls the estimate toward their cluster compared with the unweighted version.",
  section: "Density Contour Mark",
  tags: ['densityContour', 'weight', 'dot'],
  docs: ['repo/docs/reference/marks/density.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
