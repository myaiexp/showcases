// vchart example: HTML in a custom mark: enableHtmlAttribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HTML in a custom mark: enableHtmlAttribute",
  summary:
    "With enableHtmlAttribute on the VChart options, a custom mark's style.html places a real DOM element in the chart. A rect mark with layoutType region-relative and orient top reserves a banner above the plot and hosts an HTML header whose numbers change with updateData.",
  section: 'Custom Extension',
  tags: ['enableHtmlAttribute', 'customMark', 'style.html', 'layoutType', 'region-relative', 'orient'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/Richtext_and_Dom.md',
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
