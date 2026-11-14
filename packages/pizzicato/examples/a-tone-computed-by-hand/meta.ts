// Pizzicato.js example: a sine wave computed sample by sample
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A tone computed by hand',
  summary:
    "A wave sound makes a sine for you, but a script sound lets you do the maths: keep a phase, add a small step for every sample, and write sin(phase). The bigger the step, the higher the pitch. The dial shows the phase turning, slowed down so you can follow it.",
  section: 'Create a sound',
  tags: ['Sound', "source: 'script'", 'audioFunction', 'phase', 'sine'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
