// playcanvas example: Extra streams from copy to render
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Work buffer streams: from copy to render',
  summary:
    'A splatId stream added to the scene work buffer format with addExtraStreams carries data between the two customisable stages. Each component writes its own id while its splats are copied, and a global gsplatModifyVS chunk on the scene material reads it with loadSplatId and tints each splat from a small colour lookup texture that is animated on the CPU.',
  section: 'Gaussian Splatting',
  tags: ['GSplatFormat.addExtraStreams', 'PIXELFORMAT_R32U', 'writeSplatId', 'loadSplatId', 'setWorkBufferModifier', 'gsplatModifyVS', 'GSplatParams.format'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/work-buffer-format.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/work-buffer-rendering.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/splat-data-format.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
