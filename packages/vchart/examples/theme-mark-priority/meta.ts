// vchart example: Theme: mark and markByName priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Theme: mark and markByName priority",
  summary:
    "theme.mark styles every mark of a type and theme.markByName styles marks by name; in a bar and line chart the selector sets one, the other or both, and the name entry overrides the type entry where they overlap.",
  section: "Theme",
  tags: ['theme.mark','theme.markByName','point','bar','symbol'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Theme/Theme.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
