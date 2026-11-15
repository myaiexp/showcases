// galacean example: Local post-process volume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Local post-process volume",
  summary: "A local PostProcess volume with a collider: bloom is off outside it and fades in as the camera flies into the box, reaching full strength inside. Local mode needs a collider and a physics-enabled engine.",
  section: "Post Process",
  tags: ['PostProcess.isGlobal','BoxColliderShape','StaticCollider','blendDistance'],
  docs: [
    'repo/docs/en/graphics/postProcess/postProcess.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
