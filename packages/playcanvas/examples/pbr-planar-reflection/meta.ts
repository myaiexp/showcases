// PlayCanvas example: Planar reflection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Planar reflection",
  summary:
    "A polished floor reflects bobbing shapes with the PlanarRenderer script: a mirrored camera renders the reflected layers into a texture each frame, which the floor material takes as planarReflectionMap. The floor sits on its own layer.",
  section: "Graphics: Physically Based Rendering",
  tags: ["PlanarRenderer", "planarReflectionMap", "planarReflectionMatrix", "Layer", "CameraComponent"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
