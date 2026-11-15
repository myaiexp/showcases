// tanstack-charts example: binTimeX domain fills empty intervals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "binTimeX domain fills empty intervals",
  summary:
    "A domain of two dates tells binTimeX which range to cover. Orders exist for only part of the range; with the data extent the bins stop where the data stops, and with a wider domain the empty weeks appear as zero-count bins.",
  section: "Data Transforms",
  tags: ["binTimeX", "domain", "utcWeek"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
