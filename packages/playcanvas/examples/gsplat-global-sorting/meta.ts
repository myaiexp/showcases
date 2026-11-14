// playcanvas example: Global sorting of splat components
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Global sorting across components',
  summary:
    'Every splat of every gsplat component is copied into one work buffer and sorted together, instead of each component being ordered by its bounding box. Three tinted galaxies with their own transforms turn through each other without popping or wrong ordering; the separation slider pulls them apart until they stop overlapping.',
  section: 'Gaussian Splatting',
  tags: ['global sorting', 'work buffer', 'GSplatComponent', 'GSplatContainer', 'Entity.rotate'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/index.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/renderers.md',
    'repo/docs/user-manual/editor/scenes/components/gsplat.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
