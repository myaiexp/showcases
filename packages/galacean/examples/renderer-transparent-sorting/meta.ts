// galacean example: Transparent sorting by distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transparent sorting by distance",
  summary:
    "Three translucent panes at different depths are drawn from far to near within the transparent queue (opaque ones go near to far). As the camera circles, the order flips and the blended colours stay right.",
  section: "Renderer",
  tags: ['render queue', 'isTransparent', 'UnlitMaterial'],
  docs: [
    'repo/docs/en/graphics/renderer/order.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
