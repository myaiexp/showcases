// float, fixed-size and persistent passes running a ripple simulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ripple simulation: float and size',
  summary:
    'A wave simulation lives in its own pass: persistent so it reads its last frame, float: true because heights go below zero, and size: [160, 106] so it runs on a small fixed grid (there resolution is the size and offset is 0). The display pass bends the picture by the water\'s slope. The pointer, or a stand-in in the card, drops in ripples.',
  section: 'Multipass',
  tags: ['multipass', 'float', 'size', 'persistent', 'simulation', 'per-pass uniforms'],
  docs: ['repo/docs/MULTIPASS.md', 'pages/amagi-dev/vfx-js/shaders.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
