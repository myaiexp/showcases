// playcanvas example: Render component primitive types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Render component primitive types',
  summary:
    "A render component draws a primitive when its type is box, capsule, cone, cylinder, plane or sphere. Six bobbing shapes, each with its own material, cast shadows onto a floor that only receives them; the full view toggles castShadows and receiveShadows and changes one shape's type at runtime.",
  section: 'Components',
  tags: ['RenderComponent', 'type', 'castShadows', 'receiveShadows', 'material'],
  docs: ['repo/docs/user-manual/editor/scenes/components/render.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
