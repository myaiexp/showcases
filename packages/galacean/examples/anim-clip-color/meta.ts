// galacean example: Animation: material colour clip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: material colour clip",
  summary:
    "The material-animation guide in script: an AnimationColorCurve on the renderer's getMaterial().baseColor cycles red, green, blue and back to red.",
  section: "Animation",
  tags: ['AnimationColorCurve','MeshRenderer','getMaterial().baseColor'],
  docs: [
    'repo/docs/en/animation/examples/material-animation.mdx',
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
