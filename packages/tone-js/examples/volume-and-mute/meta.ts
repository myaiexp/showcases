// tone-js example: Turn a sound down, then mute and unmute it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Turn a sound down, then mute and unmute it",
  summary:
    "Tone.Volume is a fader in decibels: every -6 dB halves the amplitude. Setting mute drops it to -Infinity and remembers the level, so unmuting brings the sound back exactly where it was.",
  section: "Channels and routing",
  tags: ["Volume", "volume", "mute", "decibels"],
  docs: ["repo/Tone/component/channel/Volume.ts", "repo/Connections.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
