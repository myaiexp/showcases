// babylon-js example: Custom loading screen with progress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom loading screen with progress",
  summary:
    "A class implementing ILoadingScreen replaces engine.loadingScreen with a DOM overlay; displayLoadingUI, loadingUIText and hideLoadingUI drive it while six glb models load one at a time, with a progress bar and a selectable background colour.",
  section: "Scene",
  tags: ['ILoadingScreen', 'engine.loadingScreen', 'displayLoadingUI', 'hideLoadingUI', 'loadingUIText', 'loadingUIBackgroundColor'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/customLoadingScreen.md',
    'repo/content/features/featuresDeepDive/importers/assetManager.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
