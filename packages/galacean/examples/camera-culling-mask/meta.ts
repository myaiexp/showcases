// galacean example: Culling mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Culling mask",
  summary:
    "Three groups of shapes live on Layer1, Layer2 and Layer3, and one Camera's cullingMask picks which layers it draws: the card steps through the masks, the full view has a checkbox per layer.",
  section: "Camera",
  tags: ['Camera', 'cullingMask', 'Layer', 'Entity.layer'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
