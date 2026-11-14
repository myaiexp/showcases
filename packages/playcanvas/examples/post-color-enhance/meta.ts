// playcanvas example: CameraFrame colour enhance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame colour enhance',
  summary:
    'colorEnhance is off by default and adjusts the tonal range selectively in HDR: shadows and highlights (-3 to 3), midtones, vibrance and dehaze (-1 to 1), all defaulting to 0. The card sweeps shadows, highlights and vibrance in turn; the full view has a slider for each.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'colorEnhance.enabled', 'colorEnhance.shadows', 'colorEnhance.highlights', 'colorEnhance.midtones', 'colorEnhance.vibrance', 'colorEnhance.dehaze'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
