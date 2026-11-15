// galacean example: Performance: share materials
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Performance: share materials",
  summary:
    "Many cubes with one shared material against the same cubes with a material each: the docs advise merging materials so draw calls can batch. A readout of frame time compares the two, with a toggle.",
  section: "Performance",
  tags: ['Material', 'MeshRenderer', 'setMaterial', 'Time', 'actualDeltaTime'],
  docs: [
    'repo/docs/en/performance/scene-standard.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
