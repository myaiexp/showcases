// resolve-clear example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Replace earlier resolvers",
  summary:
    "Resolvers pile up like options. Passing true to .resolve() drops the earlier ones: one client still handles a 404 politely, the other lost that handler and the error reaches the caller.",
  section: "Helper methods",
  tags: ["resolve", "notFound"],
  docs: ["repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
