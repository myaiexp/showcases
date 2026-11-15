// l7 example: ExportImage imageType and getImage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ExportImage imageType and getImage",
  summary:
    "getImage() returns the same base64 screenshot as a promise without clicking; imageType picks png or jpeg.",
  section: "Component",
  tags: ["ExportImage","getImage","imageType"],
  docs: ["repo/site/docs/api/component/export-image.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
