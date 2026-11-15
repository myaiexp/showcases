// galacean example: Opaque, AlphaTest and Transparent queues
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Opaque, AlphaTest and Transparent queues",
  summary:
    "One textured quad with a soft disc in its alpha channel goes to a different render queue depending on its material: opaque (alpha ignored), alpha test (alphaCutoff above zero, a hard edge) or transparent (blended).",
  section: "Renderer",
  tags: ['UnlitMaterial', 'isTransparent', 'alphaCutoff', 'render queue'],
  docs: [
    'repo/docs/en/graphics/renderer/order.mdx',
    'repo/docs/en/graphics/texture/2d.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
