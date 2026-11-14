// plugging-in-addons: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Add features with .addon()",
  summary:
    "A plain client has no .formData() or .query(). Plugging two addons in with .addon([...]) adds both: watch the methods appear, then see the form body and the query string reach the server.",
  section: 'Addons',
  tags: ["addon", "FormDataAddon", "QueryStringAddon"],
  docs: ["repo/README.md", "repo/src/addons/index.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
