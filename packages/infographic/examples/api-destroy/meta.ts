// AntV Infographic example: Infographic API: destroy() and the destroyed event
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Infographic API: destroy() and the destroyed event",
  summary:
    "destroy() clears the rendered SVG, tears down the editor and drops every listener; the destroyed event fires just before the listeners go. The card draws, destroys (the box goes empty and the event is reported), then builds a fresh instance and draws again.",
  section: "Infographic API",
  tags: ["destroy", "destroyed", "on"],
  docs: ["repo/site/src/content/reference/infographic-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
