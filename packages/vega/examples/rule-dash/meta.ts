// vega example: Rule: Endpoints, Dash and Cap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Rule: Endpoints, Dash and Cap",
  summary:
    "One rule between two moving endpoints, drawn with a stroke width, a dash pattern and a cap. The corner dots show where x, y and x2, y2 sit.",
  section: "Mark Types",
  tags: ['marks.rule.x2','marks.rule.y2','marks.rule.strokeDash','marks.rule.strokeCap'],
  docs: ['repo/docs/docs/marks/rule.md', 'repo/docs/docs/marks/rule.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
