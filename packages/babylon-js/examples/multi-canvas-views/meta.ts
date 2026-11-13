// babylon-js example: One engine, several canvas views
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "One engine, several canvas views",
  summary:
    "One Engine draws a single scene into three separate canvases with engine.registerView, one camera per view (orbit, top, side). The render loop checks activeView to animate once per frame, and view.enabled switches a canvas off.",
  section: "Scene",
  tags: ['registerView', 'unRegisterView', 'EngineView', 'activeView', 'inputElement', 'view.enabled'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/multiCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
