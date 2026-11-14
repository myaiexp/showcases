// Tone.js example: your microphone as a Tone.js source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your microphone as a source',
  summary:
    "Tone.UserMedia turns the microphone into a source you can meter or send through effects. The full view asks permission when you press the button; cards show a recorded voice as a stand-in and never touch the microphone.",
  section: 'Sources',
  tags: ['UserMedia', 'open', 'close', 'Meter', 'mute'],
  docs: ['repo/Tone/source/UserMedia.ts', 'repo/Tone/component/analysis/Meter.ts', 'repo/Sources.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
