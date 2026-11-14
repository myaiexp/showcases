// dexie-js example: Zones nest like boxes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Zones nest like boxes",
  summary: "A zone created inside another zone sees the outer one's values and can add its own. Back in the outer zone the inner value is gone, and outside both nothing is set.",
  section: 'Promise',
  tags: ["Promise.PSD", "Promise.newPSD"],
  docs: ["repo/docs/Promise/Promise.PSD.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
