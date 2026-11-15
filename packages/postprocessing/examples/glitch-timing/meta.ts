// postprocessing example: GlitchEffect delay and duration between and during bursts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: delay and duration',
  summary:
    'In SPORADIC mode GlitchEffect waits a random time between delay.x and delay.y seconds, then glitches for a random time between duration.x and duration.y. The readout shows the current ranges and the effect\'s active flag.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'GlitchMode.SPORADIC', 'delay', 'duration', 'minDelay', 'maxDelay', 'minDuration', 'maxDuration', 'active'],
  docs: ['repo/README.md', 'repo/src/effects/GlitchEffect.js', 'repo/src/enums/GlitchMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
