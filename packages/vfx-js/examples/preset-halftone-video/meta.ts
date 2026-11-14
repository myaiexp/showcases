// VFX-JS example: halftone preset on a video
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"halftone" preset on a video',
  summary:
    "The halftone preset turns a playing <video> into three rotated grids of red, green and blue dots sized by the picture. A video is read again every frame, so the dots follow it with no extra calls.",
  section: 'Shader presets',
  tags: ["halftone", "shader preset", "video"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
