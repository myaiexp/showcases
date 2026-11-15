// galacean example: Canvas: fixed-width mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas: fixed-width mode",
  summary:
    "Hard-code a design width of 750 pixels and derive the height: the drawing buffer is always 750 wide however the element is sized, and setScale maps it back onto the page.",
  section: "Core",
  tags: ['WebCanvas', 'width', 'height', 'setScale'],
  docs: [
    'repo/docs/en/core/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
