// l7 example: getLog for several layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getLog for several layers",
  summary:
    "getLog takes one id, an array of ids (the logs of those layers) or nothing (every log, keyed by 'map' and layer ids). Both layers' inited events are counted before reading.",
  section: "Debug",
  tags: ["getLog", "inited"],
  docs: ["repo/site/docs/api/debug/debugservice.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
