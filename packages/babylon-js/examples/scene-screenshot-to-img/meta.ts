// babylon-js example: Screenshots into an img element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Screenshots into an img element",
  summary:
    "Tools.CreateScreenshotAsync puts the active camera's view into an <img> as a data URL, and CreateScreenshotUsingRenderTargetAsync does the same for a camera that is not active, with customizeTexture trimming its renderList. Nothing is downloaded.",
  section: "Scene",
  tags: ['CreateScreenshotAsync', 'CreateScreenshotUsingRenderTargetAsync', 'customizeTexture', 'renderList', 'Tools'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/renderToPNG.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
