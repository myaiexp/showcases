// l7 example: on, once and off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "on, once and off",
  summary:
    "Three click listeners: one bound with on keeps counting, one bound with once fires a single time, and one removes itself with off after three clicks.",
  section: 'Scene',
  tags: ["on", "once", "off", "click"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
