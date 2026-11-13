// babylon-js example: Fast build with default camera, light and environment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fast build with default camera, light and environment",
  summary:
    "Two lines turn bare meshes into a viewable world: scene.createDefaultCameraOrLight adds a framed orbit camera and a light, and createDefaultEnvironment adds a skybox and ground and returns a helper (options and setMainColor shown). Re-running createDefaultCamera after adding a big box reframes the view.",
  section: "Scene",
  tags: ['createDefaultCameraOrLight', 'createDefaultCamera', 'createDefaultEnvironment', 'EnvironmentHelper', 'setMainColor', 'groundYBias'],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/content/features/featuresDeepDive/scene/fastBuildWorld.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
