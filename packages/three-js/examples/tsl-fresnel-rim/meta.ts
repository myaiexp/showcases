// Three.js example: fresnel rim term from view-space accessors, added through emissiveNode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rim lighting from the view direction',
  summary:
    'A fresnel rim built from normalView and positionViewDirection: one minus their dot product, raised to a power, tinted and added to a lit MeshStandardNodeMaterial through emissiveNode.',
  section: 'TSL',
  tags: ['fresnel', 'normalView', 'positionViewDirection', 'emissiveNode', 'MeshStandardNodeMaterial'],
  docs: ['repo/docs/llms-full.txt'],
  provenance: 'pure',
  added: '2026-11-13',
});
