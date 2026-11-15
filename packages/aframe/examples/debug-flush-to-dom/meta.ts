// aframe example: debug: component data in the DOM, and flushToDOM()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "debug: component data in the DOM, and flushToDOM()",
  summary: "By default A-Frame keeps component data in memory and the DOM attribute keeps its first value. The read-out compares the raw position attribute with the live data of a moving box: with the scene's debug component on, the attribute follows; with it off it goes stale until entity.flushToDOM() writes it out. Buttons toggle debug and flush.",
  section: 'Components',
  tags: ["debug", "flushToDOM", "component-to-DOM serialization", "getAttribute", "position"],
  docs: ["repo/docs/components/debug.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
