// galacean example: AudioSource: playOnEnabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "AudioSource: playOnEnabled",
  summary:
    "With playOnEnabled set, an AudioSource starts by itself whenever its entity is enabled. Toggling the entity off and on starts the clip again; the card shows the same entity switching with a silent indicator instead of sound.",
  section: "Audio",
  tags: ['AudioSource.playOnEnabled', 'Entity.isActive', 'AudioSource.isPlaying'],
  docs: [
    'repo/docs/en/audio/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
