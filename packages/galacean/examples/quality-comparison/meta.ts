// galacean example: Anti-aliasing side by side
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Anti-aliasing side by side",
  summary:
    "Four cameras with a viewport each draw the same thin-barred scene: no anti-aliasing, FXAA only, MSAA 4x only, and FXAA with MSAA, the comparison the docs show with pictures.",
  section: "Quality",
  tags: ['Camera.antiAliasing', 'Camera.msaaSamples', 'Camera.viewport', 'AntiAliasing', 'MSAASamples'],
  docs: [
    'repo/docs/en/graphics/quality/antiAliasing.mdx',
    'repo/docs/en/graphics/camera/multiCamera.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
