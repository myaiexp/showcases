// vega example: Interactive Legend: Click to Hide a Series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interactive Legend: Click to Hide a Series",
  summary:
    "Clicking a legend entry toggles its series on and off; hidden entries fade in the legend. In cards a ghost pointer clicks the entries in turn.",
  section: "Legends",
  tags: ["legends.encode.symbols","legends.encode.labels","legends.encode.entries","signals.on","event.click"],
  docs: ["repo/docs/docs/legends.md","repo/docs/docs/event-streams.md","repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
