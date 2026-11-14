// Tone.js example: One oscillator, every family
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One oscillator, every family',
  summary:
    "Tone.OmniOscillator is a single oscillator that becomes any other by its type string: \"sine\", an \"fm\", \"am\" or \"fat\" prefix, \"pwm\" or \"pulse\". Handy when a sound's character should be switchable without rebuilding the graph.",
  section: 'Sources',
  tags: ['OmniOscillator', 'type'],
  docs: ['repo/Sources.md', 'repo/Tone/source/oscillator/OmniOscillator.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
