// galacean example: UI image raycast padding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI image raycast padding",
  summary:
    "An Image with raycastPadding 0.25 only answers the pointer in its middle: a scripted pointer enters, sits in the padded margin and returns, and the box changes colour on onPointerEnter and onPointerExit. Controls for raycastEnabled and the padding in the full view.",
  section: "UI",
  tags: ['Image.raycastEnabled', 'raycastPadding', 'onPointerEnter', 'onPointerExit'],
  docs: [
    'repo/docs/en/UI/quickStart/image.mdx',
    'repo/docs/en/UI/system.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
