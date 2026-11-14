// deck-gl example: getFrustumPlanes() culling test
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "getFrustumPlanes() culling test",
  summary:
    "Points projected into common space and tested against the camera's six frustum planes; those outside turn grey as the camera tilts and turns.",
  section: "Viewports",
  tags: ["getFrustumPlanes", "projectPosition", "WebMercatorViewport"],
  docs: ["repo/docs/api-reference/core/viewport.md", "repo/docs/api-reference/core/web-mercator-viewport.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
