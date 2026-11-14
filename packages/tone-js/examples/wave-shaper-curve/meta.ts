// Tone.js example: Bend a sine with a WaveShaper curve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bend a sine with a WaveShaper curve',
  summary:
    'A WaveShaper maps every input level to an output level through a curve you define. As the sine swells, hard clipping, folding and stair-stepping curves each add their own harmonics.',
  section: 'Signals',
  tags: ['WaveShaper', 'setMap', 'curve'],
  docs: ['repo/Signals.md', 'repo/Tone/signal/Signal.ts', 'repo/Tone/signal/WaveShaper.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
