// galacean example: MSAA sample count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MSAA sample count",
  summary:
    "MSAA smooths the jagged edges of geometry in hardware. A slowly turning spoked wheel is drawn with msaaSamples None, 2x, 4x and 8x, the camera's default being 4x.",
  section: "Quality",
  tags: ['Camera.msaaSamples', 'MSAASamples'],
  docs: [
    'repo/docs/en/graphics/quality/antiAliasing.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
