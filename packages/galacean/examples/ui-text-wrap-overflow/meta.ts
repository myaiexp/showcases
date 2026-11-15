// galacean example: UI text wrapping and overflow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI text wrapping and overflow",
  summary:
    "A UI Text with enableWrapping wraps to the width of its UITransform and may spill past its height; the box changes size and the full view adds wrapping and overflowMode controls.",
  section: "UI",
  tags: ['Text.enableWrapping', 'overflowMode', 'UITransform.size'],
  docs: [
    'repo/docs/en/UI/quickStart/text.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
