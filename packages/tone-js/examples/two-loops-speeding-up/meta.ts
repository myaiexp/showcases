// Tone.js example: two Loops on the Transport while the tempo ramps up to 800 BPM
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two loops speeding up',
  summary:
    'Two Tone.Loops tick on the Transport, one on the beat and one between beats, while the tempo ramps from 120 to 800 BPM over ten seconds. Every event stays locked to the tempo as it accelerates.',
  section: 'Getting started',
  tags: ['Loop', 'Transport', 'bpm', 'rampTo', 'FMSynth', 'AMSynth'],
  docs: ['repo/README.md', 'repo/Transport.md', 'repo/Tone/event/Loop.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
