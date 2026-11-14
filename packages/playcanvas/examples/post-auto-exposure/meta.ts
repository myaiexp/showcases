// playcanvas example: CameraFrame auto exposure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame auto exposure',
  summary:
    'AutoExposureEffect measures a histogram of the screen brightness and adapts the camera exposure towards middle grey, faster from dark to light than back. A scene whose light swings between dim and bright keeps a readable image; the full view shows the exposure and the 64-bin histogram, edits compensation, centre weighting and speeds, calls reset() and turns on the autoexposure debug view.',
  section: 'Graphics: Post Effects',
  tags: ['AutoExposureEffect', 'CameraFrame.addEffect', 'compensation', 'minEv', 'maxEv', 'speedDarkToLight', 'speedLightToDark', 'centerWeight', 'exposure', 'histogram', 'reset()'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/auto-exposure.md', 'repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
