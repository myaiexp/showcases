// galacean example: Input: pointer callbacks on a Script
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: pointer callbacks on a Script",
  summary:
    "A cube with a collider reacting to onPointerEnter, onPointerExit, onPointerDown, onPointerUp, onPointerClick and onPointerDrag. In a card a scripted cursor stands in for the pointer; in the full view hover, press and drag it yourself.",
  section: "Input",
  tags: ['Script', 'onPointerEnter', 'onPointerExit', 'onPointerDown', 'onPointerUp', 'onPointerClick', 'onPointerDrag', 'StaticCollider'],
  docs: [
    'repo/docs/en/input/pointer.mdx',
    'repo/docs/en/input/input.mdx',
    'repo/docs/en/script/class.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
