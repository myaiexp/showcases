// 3d-force-graph example: Render control: renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render control: renderer",
  summary:
    "renderer() is the three WebGLRenderer. Setting its toneMapping and toneMappingExposure changes how over-bright colours are mapped to the screen, without touching the graph.",
  section: "Render control",
  tags: ['renderer', 'nodeColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
