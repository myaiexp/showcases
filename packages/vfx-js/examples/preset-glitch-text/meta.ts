// VFX-JS example: glitch preset on text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '"glitch" preset on text',
  summary:
    "The glitch preset on a headline instead of a picture: bursts of shifted RGB channels and torn lines. overflow: 30 gives the tears room past the text box.",
  section: 'Shader presets',
  tags: ["glitch", "shader preset", "overflow", "text"],
  docs: ['pages/amagi-dev/vfx-js/effects.md', 'repo/packages/vfx-js/src/constants.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
