// g6 example: Shape: upsert creates, updates and removes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shape: upsert creates, updates and removes",
  summary: "Two toggles pass a style or false to upsert for the dot and bar shapes. A log shows the create, update and destroy hooks.",
  section: 'Shape',
  tags: ["upsert", "UpsertHooks", "afterCreate", "beforeDestroy"],
  docs: [
    "repo/packages/site/docs/manual/element/shape/overview.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
