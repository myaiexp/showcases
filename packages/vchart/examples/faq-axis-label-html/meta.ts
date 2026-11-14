// vchart example: FAQ: HTML axis labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: HTML axis labels",
  summary:
    "With enableHtmlAttribute on, an axis label formatMethod can return type html and a DOM string, so the labels become real elements: here pill badges you can click, delegated from the container.",
  section: 'FAQ',
  tags: ["enableHtmlAttribute","axes.label.formatMethod","html"],
  docs: [
    "repo/docs/assets/faq/en/26- How to render axis labels using HTML.md",
    "repo/docs/assets/option/en/component/axis-common/axis-label.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
