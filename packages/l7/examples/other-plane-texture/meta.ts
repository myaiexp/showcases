// l7 example: PlaneGeometry mapTexture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PlaneGeometry mapTexture',
  summary:
    'mapTexture drapes a picture over the plane: a texture drawn on a canvas here, passed as a data URL instead of the docs\' remote image.',
  section: 'Other Layers',
  tags: ['GeometryLayer', 'shape(\'plane\')', 'mapTexture', 'center', 'width', 'height'],
  docs: [
    'repo/site/docs/api/other/plane.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
