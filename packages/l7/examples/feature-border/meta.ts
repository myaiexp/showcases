// l7 example: Feature border: borderWidth and borderColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature border: borderWidth and borderColor",
  summary:
    "borderWidth (default 0, effective up to 0.5) and borderColor draw an outline around the line. In 2.29.1 only shape line draws it; the docs show an arc, which ignores it.",
  section: "Layer: Features",
  tags: ["border","borderWidth","borderColor"],
  docs: ["repo/site/docs/api/common/features/border.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
