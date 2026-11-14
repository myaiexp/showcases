// vchart example: 3D: a funnel3d chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: a funnel3d chart",
  summary:
    "funnel3d stacks 3D trapezoid blocks by categoryField and valueField. funnel3d.style.face chooses which faces of each block are drawn, isTransform adds the transform layer between blocks, and label.support3d draws labels in the 3D space.",
  section: "3D Charts",
  tags: ['funnel3d','registerFunnel3dChart','face','isTransform','label.support3d','maxSize','minSize'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Funnel.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
