// Tone.js example: A whole instrument from one recording
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A whole instrument from one recording',
  summary:
    'Give Tone.Sampler a single recording of one note and it re-pitches it for every other key, so a melody and a chord come from one gong. No sample files are loaded here: the gong is rendered in code.',
  section: 'Instruments',
  tags: ['Sampler', 'urls', 'triggerAttackRelease', 'release'],
  docs: ['repo/README.md', 'repo/Tone/instrument/Sampler.ts', 'repo/Instruments.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
