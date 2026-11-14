// request-timings: example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Measure how long a request took",
  summary:
    ".perfs() calls you back with the Performance timing of the request. A bar shows when it began and how long it lasted; slow the server down and the bar grows.",
  section: 'Addons',
  tags: ["perfs", "PerfsAddon", "Performance"],
  docs: ["repo/README.md", "repo/src/addons/perfs.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
