// l7 example: Source transform: join
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Source transform: join",
  summary:
    "join attaches business rows to geographic features by a shared field, so countries can be coloured by a value the geometry never had.",
  section: "Source",
  tags: ["transforms","join","sourceField","targetField","data","PolygonLayer"],
  docs: ["repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
