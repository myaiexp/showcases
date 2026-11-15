// galacean example: Input: dragging with onPointerDrag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: dragging with onPointerDrag",
  summary:
    "onPointerDrag fires every frame while the pointer is held on a collider. The script casts the pointer position through camera.screenPointToRay onto a plane and moves the cube there.",
  section: "Input",
  tags: ['Script', 'onPointerDrag', 'PointerEventData', 'screenPointToRay', 'Ray', 'intersectPlane'],
  docs: [
    'repo/docs/en/input/pointer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
