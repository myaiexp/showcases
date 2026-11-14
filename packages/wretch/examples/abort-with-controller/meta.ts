// abort-with-controller: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Cancel a request with .controller()",
  summary:
    ".controller() hands back an AbortController plus the chain. Press Cancel while the report is loading: the request stops, .onAbort() runs and .json() never does.",
  section: 'Addons',
  tags: ["controller", "onAbort", "AbortAddon"],
  docs: ["repo/README.md", "repo/src/addons/abort.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
