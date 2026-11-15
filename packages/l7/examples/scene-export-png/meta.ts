// l7 example: exportPng
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "exportPng",
  summary:
    "exportPng returns the layers as a data URL (png or jpg). The Scene is created with preserveDrawingBuffer: true so the frame can be read; snapshots stack in the corner.",
  section: 'Scene',
  tags: ["exportPng", "exportMap", "preserveDrawingBuffer"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
