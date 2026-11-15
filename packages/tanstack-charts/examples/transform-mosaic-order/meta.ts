// tanstack-charts example: mosaic xOrder and yOrder
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "mosaic xOrder and yOrder",
  summary:
    "Categories appear in first-seen order unless xOrder and yOrder are given. The select compares first-seen order with an explicit order of questions from widest to narrowest and responses from Disagree to Agree, which also fixes the colour and stacking order.",
  section: "Data Transforms",
  tags: ["mosaicY", "xOrder", "yOrder", "rect"],
  docs: ['repo/docs/reference/transforms.md', 'repo/docs/guides/legends-and-color.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
