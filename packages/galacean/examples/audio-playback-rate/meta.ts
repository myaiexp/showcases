// galacean example: AudioSource: playbackRate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AudioSource: playbackRate",
  summary:
    "playbackRate speeds a clip up or slows it down (and shifts its pitch): the readout shows the rate and the real time a pass takes, duration divided by rate. The card runs the playhead silently at a changing rate; the full view has a slider.",
  section: "Audio",
  tags: ['AudioSource.playbackRate', 'AudioClip.duration', 'AudioSource.time'],
  docs: [
    'repo/docs/en/audio/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
