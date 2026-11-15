// galacean example: AudioSource: loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AudioSource: loop",
  summary:
    "A short clip with loop on keeps isPlaying true and wraps time back to zero at the end; with loop off it stops after one pass. The card replays both behaviours silently, the full view lets you toggle loop while it plays.",
  section: "Audio",
  tags: ['AudioSource.loop', 'AudioSource.isPlaying', 'AudioSource.time'],
  docs: [
    'repo/docs/en/audio/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
