// vega example: Interactive Legend: Hover Highlights Marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interactive Legend: Hover Highlights Marks",
  summary:
    "Hovering a legend symbol or label dims every mark outside that group and fades the other legend entries; a ghost pointer walks down the legend in cards.",
  section: "Legends",
  tags: ["legends.encode.symbols","legends.encode.labels","legends.encode.entries","signals.on","event.mark"],
  docs: ["repo/docs/docs/legends.md","repo/docs/docs/event-streams.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
