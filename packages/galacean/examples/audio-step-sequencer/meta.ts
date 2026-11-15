// galacean example: AudioSource: a drum step sequencer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AudioSource: a drum step sequencer",
  summary:
    "Three AudioSources hold a kick, a snare and a hat synthesised in code, and a script plays them in a 16-step pattern. The pads flash on every step; the card flashes them silently, the full view plays the beat.",
  section: "Audio",
  tags: ['AudioSource.play', 'AudioSource.stop', 'AudioClip', 'AssetType.Audio'],
  docs: [
    'repo/docs/en/audio/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
