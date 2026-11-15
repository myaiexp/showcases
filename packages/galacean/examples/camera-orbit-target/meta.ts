// galacean example: OrbitControl target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OrbitControl target",
  summary:
    "The orbit target is the point the camera circles and looks at. The card moves it from shape to shape while autoRotate keeps the camera circling; the full view has a button per shape.",
  section: "Camera",
  tags: ['OrbitControl', 'target', 'autoRotate'],
  docs: [
    'repo/docs/en/graphics/camera/control.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
