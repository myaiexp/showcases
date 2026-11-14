// vchart example: 3D: a bar3d chart with a turning camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: a bar3d chart with a turning camera",
  summary:
    "The bar chart in three dimensions: registerBar3dChart from vchart-extension, type bar3d, and bar3d.style length and z for each bar's depth, with the axes in mode 3d. The camera swings slowly through the stage's 3D options while new values arrive.",
  section: "3D Charts",
  tags: ['bar3d','registerBar3dChart','options3d','axes.mode','bar3d.style.length'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Bar.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
