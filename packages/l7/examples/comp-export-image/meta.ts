// l7 example: ExportImage onExport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ExportImage onExport",
  summary:
    "Clicking the control screenshots the map and hands a base64 string to onExport; here each picture is shown in a strip over the map.",
  section: "Component",
  tags: ["ExportImage","onExport","preserveDrawingBuffer"],
  docs: ["repo/site/docs/api/component/export-image.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
