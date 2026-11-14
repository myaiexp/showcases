// Tone.js example: Your first arpeggiator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your first arpeggiator',
  summary:
    'Following the wiki tutorial: a Tone.Pattern plays the next note of a C pentatonic scale on every beat, up and round again, and the Transport gets it going. Swap the instrument between Synth, AMSynth and FMSynth without touching anything else.',
  section: 'Events',
  tags: ['Pattern', 'Synth', 'AMSynth', 'FMSynth', 'triggerAttackRelease'],
  docs: [
    'repo/Arpeggiator.md',
    'repo/Events.md',
    'repo/Tone/event/Pattern.ts',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
