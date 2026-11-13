// babylon-js example: Tags and boolean mesh queries
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tags and boolean mesh queries",
  summary:
    "Nine meshes carry colour, shape and size tags from Tags.AddTagsTo; a boolean query such as (red || green) && !small goes to scene.getMeshesByTags and the matches are outlined. A plain object shows Tags.EnableFor and matchesTagsQuery.",
  section: "Tags",
  tags: ['Tags', 'AddTagsTo', 'EnableFor', 'getMeshesByTags', 'matchesTagsQuery', 'AndOrNotEvaluator'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/tags.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
