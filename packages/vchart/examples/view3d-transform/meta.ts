// vchart example: 3D: options3d camera and view transform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: options3d camera and view transform",
  summary:
    "options3d takes the camera angles alpha and beta (radians) and enableView3dTransform, which lets the reader drag the chart to rotate it. Two sliders set the camera of the bar3d chart; the card turns it by itself.",
  section: "3D Charts",
  tags: ['options3d','alpha','beta','enableView3dTransform','bar3d'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Line.md',
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Bar.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
