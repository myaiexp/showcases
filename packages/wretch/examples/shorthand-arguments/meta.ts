// shorthand-arguments example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shorthands that say the same thing",
  summary:
    "api.get(\"/posts\") equals api.url(\"/posts\").get(), and api.post(obj, \"/posts\") equals api.json(obj).url(\"/posts\").post(). Pairs of envelopes show the requests match.",
  section: "HTTP methods",
  tags: ["get", "post", "url", "json"],
  docs: ["repo/README.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
