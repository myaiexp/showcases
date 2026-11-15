// galacean example: Shadow map resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shadow map resolution",
  summary:
    "scene.shadowResolution sets the shadow map to 512, 1024, 2048 or 4096 texels. With hard shadows over a large floor the low settings show blocky edges that sharpen as it climbs.",
  section: "Light",
  tags: ['scene.shadowResolution', 'ShadowResolution', 'ShadowType'],
  docs: [
    'repo/docs/en/graphics/light/shadow.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
