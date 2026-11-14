// deck-gl example: Interleaved GPU buffer as attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interleaved GPU buffer as attributes',
  summary:
    "A PointCloudLayer reads position and colour from one interleaved luma.gl Buffer through data.attributes {buffer, size, offset, stride}. The buffer is rewritten every frame, so a wave moves with no accessor ever running.",
  section: 'Data and performance',
  tags: ['data.attributes', 'buffer', 'offset', 'stride', 'PointCloudLayer', 'luma.gl'],
  docs: [
    'repo/docs/developer-guide/performance.md',
    'repo/docs/api-reference/core/layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
