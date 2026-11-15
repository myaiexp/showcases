// galacean example: OrbitControl rotate, zoom, pan and keys
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OrbitControl rotate, zoom, pan and keys",
  summary:
    "Switch OrbitControl's inputs on and off: enableRotate, enableZoom, enablePan and the arrow-key enableKeys with its keyPanSpeed. The card cycles through them while autoRotate keeps the view alive.",
  section: "Camera",
  tags: ['OrbitControl', 'enableRotate', 'enableZoom', 'enablePan', 'enableKeys', 'keyPanSpeed'],
  docs: [
    'repo/docs/en/graphics/camera/control.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
