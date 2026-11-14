// PlayCanvas example: HDR rendering with CameraFrame bloom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HDR rendering with CameraFrame bloom",
  summary:
    "Neon capsules with emissiveIntensity 40 bloom through a CameraFrame: a floating-point render target, tone mapping and bloom as passes. The full view sets bloom intensity and blur, tone mapping, vignette and emissive intensity.",
  section: "Graphics: Linear Workflow",
  tags: ["CameraFrame", "rendering", "toneMapping", "bloom", "intensity", "vignette", "emissiveIntensity", "TONEMAP_NEUTRAL"],
  docs: ["repo/docs/user-manual/graphics/linear-workflow/hdr-rendering.md", "repo/docs/user-manual/graphics/linear-workflow/index.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
