// galacean example: FreeControl roaming
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FreeControl roaming",
  summary:
    "FreeControl turns the camera into a first-person roamer: keys move it, dragging looks around, and floorMock keeps it above floorY. The card flies a scripted tour past a field of pillars; the full view is yours to steer.",
  section: "Camera",
  tags: ['FreeControl', 'movementSpeed', 'rotateSpeed', 'floorMock', 'floorY'],
  docs: [
    'repo/docs/en/graphics/camera/control.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
