// VFX-JS example: rgbGlitch preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"rgbGlitch" preset',
  summary:
    "The rgbGlitch preset splits the red, green and blue channels and shifts random horizontal blocks in short bursts, with calm stretches in between.",
  section: 'Shader presets',
  tags: ["rgbGlitch", "shader preset"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
