// playcanvas example: Picking splats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picking splats with the Picker',
  summary:
    'pc.Picker works on splats like on meshes once app.scene.gsplat.enableIds is on: prepare renders an id texture, getSelectionAsync returns the GSplatComponent under a pixel and getWorldPointAsync the 3D point from the depth buffer. Click a shape in the full view; the card sweeps a virtual pointer across three shapes by itself.',
  section: 'Gaussian Splatting',
  tags: ['Picker', 'GSplatParams.enableIds', 'Picker.prepare', 'getSelectionAsync', 'getWorldPointAsync', 'GSplatComponent'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/picking.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/renderers.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
