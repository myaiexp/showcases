// aframe example: <a-sky>: an equirectangular image around the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-sky>: an equirectangular image around the camera',
  summary:
    '<a-sky> wraps a 2:1 equirectangular image on a large sphere seen from inside (radius 500, side back, flat shader), so it surrounds the camera as a background. Drag to look around; the button swaps the image for the docs\' plain colour.',
  section: 'Primitives',
  tags: ['a-sky', 'src', 'color', 'equirectangular', 'a-assets', 'material'],
  docs: ['repo/docs/primitives/a-sky.md', 'repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
