// galacean example: OrbitControl angle and distance limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OrbitControl angle and distance limits",
  summary:
    "OrbitControl clamps the orbit: azimuth angles limit the horizontal sweep, polar angles the vertical one, and distances the zoom. In the card autoRotate pushes against a moving azimuth limit.",
  section: "Camera",
  tags: ['OrbitControl', 'minPolarAngle', 'maxPolarAngle', 'minAzimuthAngle', 'maxAzimuthAngle', 'minDistance', 'maxDistance'],
  docs: [
    'repo/docs/en/graphics/camera/control.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
