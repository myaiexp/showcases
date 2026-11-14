// babylon-js example: SceneOptimizer with applied optimizations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "SceneOptimizer with applied optimizations",
  summary:
    "A SceneOptimizer with an unreachable target frame rate walks through a preset's degradation levels on a scene with shadows, particles, a post process and many cubes. Each applied optimization is listed as onNewOptimizationAppliedObservable fires.",
  section: "Scene",
  tags: ['SceneOptimizer', 'SceneOptimizerOptions', 'onNewOptimizationAppliedObservable', 'HardwareScalingOptimization', 'MergeMeshesOptimization'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/sceneOptimizer.md',
    'repo/content/features/featuresDeepDive/scene/optimize_your_scene.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
