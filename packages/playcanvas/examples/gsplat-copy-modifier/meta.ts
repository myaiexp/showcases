// playcanvas example: Copy-stage work buffer modifier
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The work buffer copy: setWorkBufferModifier',
  summary:
    'Splats are copied into a work buffer before sorting, and each gsplat component can customise that copy with its own modifier code. Three components share one torus-knot container; each has its own uTint, uLift and uWobble set with setParameter, and WORKBUFFER_UPDATE_ALWAYS rebuilds the buffer each frame because the shader animates with time.',
  section: 'Gaussian Splatting',
  tags: ['GSplatComponent.setWorkBufferModifier', 'GSplatComponent.setParameter', 'WORKBUFFER_UPDATE_ALWAYS', 'modifySplatCenter', 'modifySplatColor'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
