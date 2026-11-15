// galacean example: AudioSource: play, pause, stop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AudioSource: play, pause, stop",
  summary:
    "Three buttons drive an AudioSource: play starts or resumes, pause keeps the position and stop rewinds it. The readout shows isPlaying and time, and the playhead follows source.time. The card runs a silent replay of the same play, pause and stop sequence on the waveform.",
  section: "Audio",
  tags: ['AudioSource.play', 'AudioSource.pause', 'AudioSource.stop', 'AudioSource.isPlaying', 'AudioSource.time'],
  docs: [
    'repo/docs/en/audio/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
