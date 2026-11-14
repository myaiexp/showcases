// deck-gl example: Fp64Extension precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fp64Extension precision',
  summary:
    'Fp64Extension adds 64-bit precision to a layer in a Web Mercator view. A one-metre grid at the maximum zoom is drawn with and without it, switchable with a check. The default 32-bit projection is already precise, so the difference is slight.',
  section: 'Extensions',
  tags: ['Fp64Extension', 'coordinateSystem', 'ScatterplotLayer'],
  docs: [
    'repo/docs/api-reference/extensions/fp64-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
