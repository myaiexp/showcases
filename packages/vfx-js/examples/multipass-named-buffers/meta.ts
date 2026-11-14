// VFX-JS example: the MULTIPASS.md named-buffer pair, on an element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Named buffers',
  summary:
    'Each pass can write to a buffer named by target, and any later pass reads it by declaring uniform sampler2D with that name. The first pass greys the portrait into "grayscale"; the second reads it and inverts the left part, up to a line that sweeps back and forth.',
  section: 'Multipass',
  tags: ['multipass', 'target', 'named buffer', 'sampler2D'],
  docs: ['repo/docs/MULTIPASS.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
