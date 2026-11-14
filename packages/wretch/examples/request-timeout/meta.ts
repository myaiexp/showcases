// request-timeout: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Give up after a deadline",
  summary:
    ".setTimeout(1000) aborts a request that is slower than one second. Change how long the server takes: under the deadline the answer arrives, over it the request is cut and .onAbort() shows a friendly message.",
  section: 'Addons',
  tags: ["setTimeout", "onAbort", "AbortAddon"],
  docs: ["repo/README.md", "repo/src/addons/abort.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
