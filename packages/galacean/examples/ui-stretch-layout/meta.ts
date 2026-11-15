// galacean example: UI responsive stretch layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "UI responsive stretch layout",
  summary:
    "A header, sidebar and content area built only from LeftAndRight and TopAndBottom alignment with margins: they resize with their window frame. Sliders resize the frame in the full view.",
  section: "UI",
  tags: ['HorizontalAlignmentMode.LeftAndRight', 'VerticalAlignmentMode.TopAndBottom', 'UITransform'],
  docs: [
    'repo/docs/en/UI/quickStart/transform.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
