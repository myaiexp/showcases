// override-a-catcher example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One request handles 404 its own way",
  summary:
    "A client-wide .catcher(404) is the default. A single request can add its own .notFound(), which takes over for that request. Highlighted handler names show which one ran.",
  section: "Helper methods",
  tags: ["catcher", "notFound"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
