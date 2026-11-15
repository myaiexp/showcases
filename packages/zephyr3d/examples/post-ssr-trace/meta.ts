// zephyr3d example: SSR ray marching: stride, steps and thickness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSR ray marching: stride, steps and thickness',
  summary:
    'With HiZ off, each reflection ray advances ssrStride pixels per step for up to ssrIterations steps, no further than ssrMaxDistance. ssrThickness and ssrCalcThickness decide what counts as a hit behind a surface.',
  section: 'Post-processing',
  tags: ['SSR', 'HiZ', 'ssrStride', 'ssrIterations', 'ssrMaxDistance', 'ssrThickness', 'ssrCalcThickness'],
  docs: ['repo/apps/doc/web/en/posteffect-ssr.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
