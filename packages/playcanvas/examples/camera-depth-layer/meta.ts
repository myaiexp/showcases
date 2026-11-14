// playcanvas example: Scene depth map in a shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scene depth map in a shader",
  summary:
    "requestSceneDepthMap makes the camera capture its depth buffer for uSceneDepthMap. A custom ShaderMaterial water plane includes the engine's screenDepth chunk and foams where it meets rocks and a column.",
  section: "Graphics: Cameras",
  tags: ["requestSceneDepthMap","uSceneDepthMap","ShaderMaterial","getLinearScreenDepth","setParameter"],
  docs: ["repo/docs/user-manual/graphics/cameras/depth-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
