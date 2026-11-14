// VFX-JS example: blink preset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"blink" preset',
  summary:
    "The blink preset dims and brightens the whole element on a steady beat (brightness between 60% and 100%), here on a small card of HTML.",
  section: 'Shader presets',
  tags: ["blink", "shader preset", "html"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
