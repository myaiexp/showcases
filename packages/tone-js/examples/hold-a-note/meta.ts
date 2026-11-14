// Tone.js example: hold a note with triggerAttack and let go with triggerRelease
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hold a note, then let go',
  summary:
    'triggerAttack starts a note and it keeps sounding until triggerRelease, like holding a piano key down. In the full view, press and hold a key: the note lasts as long as your finger does.',
  section: 'Getting started',
  tags: ['Synth', 'triggerAttack', 'triggerRelease', 'Tone.now'],
  docs: ['repo/README.md', 'repo/Instruments.md', 'repo/Tone/instrument/Monophonic.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
