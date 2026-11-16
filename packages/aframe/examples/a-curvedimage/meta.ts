// aframe example: <a-curvedimage>: an image on an arc, sized with S = r × θ
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-curvedimage>: an image on an arc, sized with S = r × θ',
  summary:
    '<a-curvedimage> puts an image on part of an open, double-sided cylinder. The docs\' formula S = r × θ gives the theta-length that keeps a 2:1 image undistorted at a chosen height and radius; theta-start centres it in front of the camera. The docs\' own example sits off to the side.',
  section: 'Primitives',
  tags: ['a-curvedimage', 'radius', 'theta-length', 'theta-start', 'height', 'src'],
  docs: ['repo/docs/primitives/a-curvedimage.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
