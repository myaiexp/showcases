// Three.js example: positionNode and normalNode on a wave-displaced plane
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Displacing vertices with positionNode',
  summary:
    'A subdivided plane is deformed in the vertex stage by assigning positionLocal plus a wave to positionNode. A matching normalNode, built from the wave slope and modelNormalMatrix, keeps the lighting correct.',
  section: 'TSL',
  tags: ['positionNode', 'normalNode', 'positionLocal', 'uniform', 'MeshStandardNodeMaterial'],
  docs: ['repo/docs/llms-full.txt', 'repo/manual/pages/webgpurenderer.html'],
  provenance: 'pure',
  added: '2026-11-13',
});
