// timeout-shared-controller: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One controller for a timeout and a cancel button",
  summary:
    "With your own .signal(controller), a plain .setTimeout() cuts nothing: it aims at a controller the request does not use. Pass { controller } and the timeout and the Cancel button share one.",
  section: 'Addons',
  tags: ["setTimeout", "signal", "controller"],
  docs: ["repo/src/addons/abort.ts", "repo/MIGRATION_V2_V3.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
