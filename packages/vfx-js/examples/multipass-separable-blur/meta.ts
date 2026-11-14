// VFX-JS example: the MULTIPASS.md separable Gaussian blur on an element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Separable Gaussian blur',
  summary:
    'The classic two-pass blur from the multipass guide: the same five-tap Gaussian shader runs horizontally, then vertically, told apart only by per-pass uniforms (direction [1, 0] and [0, 1]). An extra radius uniform, a function, spreads the taps so the blur can grow and shrink live.',
  section: 'Multipass',
  tags: ['multipass', 'per-pass uniforms', 'blur', 'function uniform'],
  docs: ['repo/docs/MULTIPASS.md', 'repo/skills/vfx-js/references/shader.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
