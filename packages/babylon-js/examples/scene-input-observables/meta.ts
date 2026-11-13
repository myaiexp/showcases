// babylon-js example: Keyboard and pointer observables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Keyboard and pointer observables",
  summary:
    "scene.onKeyboardObservable moves a ball with WASD or the arrows and scene.onPointerObservable reacts to pick, wheel and double tap, with a live tally of each event type. The preview feeds scripted key events through the same observable.",
  section: "Scene",
  tags: ['onKeyboardObservable', 'onPointerObservable', 'KeyboardEventTypes', 'PointerEventTypes', 'POINTERPICK', 'POINTERDOUBLETAP'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/interactWithScenes.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
