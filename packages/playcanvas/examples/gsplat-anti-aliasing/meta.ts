// playcanvas example: Anti-aliased splat rendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Anti-aliasing compensation for splats',
  summary:
    'Splats trained with an anti-aliasing filter need a matching opacity compensation, or small distant splats come out too bright. Two copies of a fuzzy shell of tiny splats differ only in resource.antiAlias, so each renders its own way; Scene.gsplat.antiAlias overrides both at once and antiAliasFilterSize sets the filter width the compensation assumes.',
  section: 'Gaussian Splatting',
  tags: ['GSplatResourceBase.antiAlias', 'GSplatParams.antiAlias', 'GSplatParams.antiAliasFilterSize', 'GSplatContainer'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/anti-aliasing.md',
    'repo/docs/user-manual/gaussian-splatting/building/performance.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
