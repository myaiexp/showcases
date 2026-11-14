// abort-with-signal: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cancel with your own AbortController",
  summary:
    ".signal(controller) gives requests a controller you made. Two requests share one, and a single abort() stops both, as the timeline shows.",
  section: 'Addons',
  tags: ["signal", "onAbort", "AbortAddon"],
  docs: ["repo/README.md", "repo/src/addons/abort.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
