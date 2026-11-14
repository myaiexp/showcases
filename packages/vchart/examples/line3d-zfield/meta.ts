// vchart example: 3D: a line chart with zField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "3D: a line chart with zField",
  summary:
    "A line chart becomes 3D with a zField, a z axis (type band, mode 3d) and registerAxis3dPlugin: each country is a line on its own depth lane. enableView3dTransform lets the reader drag to rotate; the card turns the camera itself.",
  section: "3D Charts",
  tags: ['line','zField','orient z','axes.mode','registerAxis3dPlugin','enableView3dTransform','options3d.center'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/3d_Line.md',
    'repo/docs/assets/changelog/en/v2-upgrade-guide.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
