// g6 example: Shape: attr() getter and setters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: attr() getter and setters",
  summary: "Buttons call shape.attr(name), attr(name, value) and attr({...}) on a circle kept from upsert and show the result.",
  section: 'Shape',
  tags: ["attr", "upsert", "afterCreate"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/properties.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
