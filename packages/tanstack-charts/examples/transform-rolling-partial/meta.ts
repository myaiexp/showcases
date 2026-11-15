// tanstack-charts example: rollingWindow partial windows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rollingWindow partial windows",
  summary:
    "With partial true the first rows get a mean over the fewer values available; with partial false rows whose window is not full are left out, so the smoothed line starts later. The select shows both for a window of twelve.",
  section: "Data Transforms",
  tags: ["rollingWindow", "partial", "lineY"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
