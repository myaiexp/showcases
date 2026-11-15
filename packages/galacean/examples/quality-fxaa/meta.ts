// galacean example: FXAA
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FXAA",
  summary:
    "FXAA is a screen-space pass over the camera's final image, so it smooths shader edges and alpha cut-outs too. Thin bars and a cut-out grille are drawn with MSAA off; the card turns camera.antiAliasing on and off.",
  section: "Quality",
  tags: ['Camera.antiAliasing', 'AntiAliasing.FXAA'],
  docs: [
    'repo/docs/en/graphics/quality/antiAliasing.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
