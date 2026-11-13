// Perspective example: flattening nested JSON objects and arrays on ingest
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested columns',
  summary:
    'Perspective tables are flat, so JSON objects and arrays are normalised when loaded. struct_flatten pivots an object into dotted columns or keeps it as JSON text; list_flatten zips, cross-multiplies or stringifies arrays. Twelve tables, one per option pair.',
  section: 'Table',
  tags: ['struct_flatten', 'list_flatten', 'nested', 'pivot', 'stringify', 'cartesian', 'zip'],
  docs: ['repo/docs/md/how_to/javascript/loading_data.md', 'repo/docs/md/explanation/table/loading_data.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
