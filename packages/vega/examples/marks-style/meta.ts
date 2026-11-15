// vega example: Named Styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Named Styles",
  summary:
    "Three bar sets pull their look from config styles: one, two stacked in order (the later wins), and one overridden by its own encode block. Bar lengths animate while the styled props hold.",
  section: "Marks",
  tags: ['marks.style','config.style'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md', 'repo/docs/docs/config.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
