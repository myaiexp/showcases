// playcanvas example: GPU splat processing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Painting splats with GSplatProcessor',
  summary:
    'A GSplatProcessor runs a shader once per splat on the GPU: it reads getCenter from the component and writes a customColor stream added with GSPLAT_STREAM_INSTANCE, with additive blending so strokes accumulate. A work buffer modifier adds that stream to the splat colour while copying, so a moving brush paints a grey ball; the full view sets radius, strength and speed, and clears the paint.',
  section: 'Gaussian Splatting',
  tags: ['GSplatProcessor', 'GSPLAT_STREAM_INSTANCE', 'GSplatFormat.addExtraStreams', 'BlendState.ADDBLEND', 'setWorkBufferModifier', 'WORKBUFFER_UPDATE_ALWAYS', 'writeCustomColor'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/splat-processing.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/splat-data-format.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
