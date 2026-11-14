// default-catchers example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Catchers set once on the client",
  summary:
    ".catcher() on the base client handles 404 and 500 for every request made from it. Three requests go out with no error handling of their own, and the right handler runs each time.",
  section: "Helper methods",
  tags: ["catcher", "base client"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
