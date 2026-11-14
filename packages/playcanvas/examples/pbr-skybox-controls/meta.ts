// PlayCanvas example: Skybox mip, intensity, rotation and exposure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Skybox mip, intensity, rotation and exposure",
  summary:
    "The scene environment's own settings: a mirror ball and a red ball turn against a rotating sky. The full view sets skyboxMip (background blur only), skyboxIntensity, exposure, skyboxRotation and the sky type.",
  section: "Graphics: Physically Based Rendering",
  tags: ["Scene", "skyboxMip", "skyboxIntensity", "skyboxRotation", "exposure", "sky", "SKYTYPE_INFINITE", "SKYTYPE_BOX", "SKYTYPE_DOME"],
  docs: ["repo/docs/user-manual/graphics/physical-rendering/environment-lighting.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
