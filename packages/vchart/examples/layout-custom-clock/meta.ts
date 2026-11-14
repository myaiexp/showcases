// vchart example: Custom layout: pies on a clock face
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom layout: pies on a clock face",
  summary:
    "The layout option of new VChart takes a function that receives every layout item and positions it itself. Twelve pie regions are set on a circle with setLayoutStartPosition and setLayoutRect, then updateLayoutAttribute; a slider changes how many hours the clock has.",
  section: 'Layout',
  tags: ['layout', 'LayoutFunction', 'setLayoutStartPosition', 'setLayoutRect', 'updateLayoutAttribute', 'region'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_layout.md',
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Cases/example-custom.md',
    'repo/docs/assets/guide/en/tutorial_docs/Layout/Layout_Strategy.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
