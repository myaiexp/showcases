// galacean example: AudioSource: volume and mute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AudioSource: volume and mute",
  summary:
    "volume sets the loudness from 0 to 1 and mute silences the source while remembering the volume. A level bar under the waveform shows the effective level; in the card the volume swings on its own and mute toggles every few seconds, with no sound.",
  section: "Audio",
  tags: ['AudioSource.volume', 'AudioSource.mute'],
  docs: [
    'repo/docs/en/audio/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
