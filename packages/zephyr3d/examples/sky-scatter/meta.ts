// zephyr3d example: Atmospheric scattering and the sunLight flag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Atmospheric scattering and the sunLight flag",
  summary:
    "skyType = 'scatter' computes the sky from the sunlight direction and needs tone mapping. Two directional lights show that only one is the sun at a time: setting directionalLight.sunLight moves the sky to it, clearing both falls back to a default sun.",
  section: "Environment",
  tags: ['skyType', 'scatter', 'sunLight', 'DirectionalLight', 'toneMap', 'toneMapExposure'],
  docs: ['repo/apps/doc/web/en/sky.md', 'repo/apps/doc/src/tut-34/main.js', 'repo/apps/doc/web/en/posteffect-tonemap.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
