// fabric example: Image filters: BlendColor modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: BlendColor modes',
  summary:
    'filters.BlendColor mixes one colour into the picture with a mode: multiply, add, difference, screen, subtract, darken, lighten, overlay, exclusion or tint.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'BlendColor', 'TBlendMode', 'mode', 'alpha'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/BlendColor.md',
    'repo/src/content/docs/api/namespaces/filters/type-aliases/TBlendMode.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
