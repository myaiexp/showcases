// postprocessing example: ScanlineEffect scrollSpeed rolling the lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scanlines: scroll speed',
  summary:
    'A non-zero scrollSpeed makes ScanlineEffect roll its lines up the screen over time, like a CRT refresh bar. Setting it back to 0 recompiles the shader without the scroll code.',
  section: 'Pattern',
  tags: ['ScanlineEffect', 'scrollSpeed', 'density'],
  docs: ['repo/README.md', 'repo/src/effects/ScanlineEffect.js', 'repo/src/effects/glsl/scanlines.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
