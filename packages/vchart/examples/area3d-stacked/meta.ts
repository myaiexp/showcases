// vchart example: 3D: a stacked area chart with zField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: a stacked area chart with zField",
  summary:
    "An area chart with stack, a zField and a z axis in 3d mode draws each country as a ribbon at its own depth. Values refresh every few seconds under a turning camera.",
  section: "3D Charts",
  tags: ['area','stack','zField','orient z','registerAxis3dPlugin','options3d'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Area.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
