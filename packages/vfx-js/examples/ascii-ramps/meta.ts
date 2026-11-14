// VFX-JS example: AsciiEffect ramps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AsciiEffect ramps',
  summary:
    'The same landscape drawn with each built-in character ramp (standard, minimal, blocks, dots, circles, detailed) or your own string, dark to light. The ramp is baked into a glyph atlas when the effect starts, so changing preset or chars goes through setParams and then updateAtlas().',
  section: '@vfx-js/effects',
  tags: ['AsciiEffect', 'ASCII_PRESETS', 'preset', 'chars', 'updateAtlas', 'setParams'],
  docs: [
    'pages/amagi-dev/vfx-js/effects.md',
    'repo/packages/effects/README.md',
    'repo/packages/effects/src/ascii.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
