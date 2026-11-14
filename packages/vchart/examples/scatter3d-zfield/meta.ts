// vchart example: 3D: a scatter plot with zField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: a scatter plot with zField",
  summary:
    "A scatter chart in 3D: xField and yField plus zField on a band z axis, sizeField for bubble size and shapeField for the symbol, all with the same chart spec as the 2D plot.",
  section: "3D Charts",
  tags: ['scatter','zField','sizeField','shapeField','registerAxis3dPlugin','options3d'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Scatter.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
