// zephyr3d example: Hair card edges: alphaCutoff, alphaDither and a blended flyaway layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hair card edges: alphaCutoff, alphaDither and a blended flyaway layer',
  summary:
    'Two layers of the same bob: an opaque core that uses alphaCutoff with alphaDither, and a flyaway layer with blendMode \'blend\'. Toggle each and change the cutoff to see how the card edges are handled.',
  section: 'Character Rendering',
  tags: ['HairMaterial', 'alphaCutoff', 'alphaDither', 'blendMode', 'vertex color alpha'],
  docs: ['repo/apps/doc/web/en/material-hair.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
