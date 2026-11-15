// 3d-force-graph example: Initialisation: rendererConfig
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initialisation: rendererConfig',
  summary:
    'rendererConfig is handed to the WebGLRenderer constructor. The left graph turns antialias off, so its lines stair-step; the right one keeps the default and also sets preserveDrawingBuffer so its canvas can be read back as an image.',
  section: 'Initialisation',
  tags: ['ForceGraph3D', 'rendererConfig', 'linkWidth', 'camera'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
