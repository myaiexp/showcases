// d2 example: Links back to parent boards
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Links back to parent boards",
  summary:
    "In a link value, `_` refers to the parent board rather than a parent container: from Rivendell, `_` goes back to the root, and from Moria, `_._` skips two boards up.",
  section: "Linking",
  tags: ["link", "layers", "_", "parent"],
  docs: [
    "repo/docs/tour/linking.md",
    "repo/static/bespoke-d2/lotr.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
