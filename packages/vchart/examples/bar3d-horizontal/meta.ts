// vchart example: 3D: horizontal bar3d
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: horizontal bar3d",
  summary:
    "A bar3d chart with direction vertical or horizontal; the horizontal one swaps the fields and the axis orientations, as the 3D bar guide describes. The camera starts with a small alpha and beta set in options3d.",
  section: "3D Charts",
  tags: ['bar3d','direction','options3d','alpha','beta'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Bar.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
