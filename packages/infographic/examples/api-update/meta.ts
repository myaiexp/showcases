// AntV Infographic example: Infographic API: update() merges into the current options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: update() merges into the current options",
  summary:
    "update() merges new syntax or options into what the instance already holds and redraws, so a single field can change. The card keeps one infographic and updates only the theme, only the template, and then both, leaving the data untouched each time.",
  section: "Infographic API",
  tags: ["update", "theme", "merge"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
