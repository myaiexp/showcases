// VFX-JS example: automatic pass0 / pass1 buffer names in a multipass chain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic pass names',
  summary:
    'A middle pass without target still gets a buffer: pass0, pass1, and so on. Pass 0 pixelates the picture, pass 1 swaps its colour channels, and the last pass reads both as uniform sampler2D pass0 and pass1, showing one below a moving line and the other above it.',
  section: 'Multipass',
  tags: ['multipass', 'pass0', 'pass1', 'target'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/docs/MULTIPASS.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
