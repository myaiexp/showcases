// playcanvas example: SMAA anti-aliasing effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SMAA anti-aliasing effect',
  summary:
    'SmaaEffect smooths jagged edges within a single frame, with no camera jitter or ghosting. It is added to a CameraFrame with addEffect; the full view switches between the low, medium, high and ultra presets (or edits threshold, search steps and corner rounding), views the edges and weights it finds, and adds MSAA on top. The card flips it on and off.',
  section: 'Graphics: Post Effects',
  tags: ['SmaaEffect', 'CameraFrame.addEffect', 'threshold', 'maxSearchSteps', 'maxSearchStepsDiag', 'cornerRounding', 'debug', 'smaaedges', 'smaaweights'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md', 'repo/docs/user-manual/graphics/posteffects/cameraframe/custom-effects.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
