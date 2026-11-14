// PlayCanvas example: Gamma correction and tone mapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gamma correction and tone mapping",
  summary:
    "A lit sphere and emissive spheres at intensities 1 to 8: cards cycle every tone mapping operator, and the full view sets the camera's toneMapping, gammaCorrection (GAMMA_NONE comes out too dark) and the scene exposure.",
  section: "Graphics: Linear Workflow",
  tags: ["CameraComponent", "toneMapping", "gammaCorrection", "GAMMA_SRGB", "GAMMA_NONE", "TONEMAP_ACES", "TONEMAP_AGX", "TONEMAP_NEUTRAL", "emissiveIntensity"],
  docs: ["repo/docs/user-manual/graphics/linear-workflow/hdr-rendering.md", "repo/docs/user-manual/graphics/linear-workflow/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
