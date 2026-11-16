// aframe example: sound: poolSize for overlapping plays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sound: poolSize for overlapping plays",
  summary: "poolSize is how many instances of one sound may play at the same time. With the default 1, a second click while the chime is still ringing does not overlap it; with a larger pool the clicks stack. A slider sets poolSize, and each click on the box starts the sound with playSound().",
  section: 'Components',
  tags: ["sound", "poolSize", "playSound", "on", "click"],
  docs: ["repo/docs/components/sound.md"],
  provenance: 'pure',
  audio: true,
  added: '2026-11-15',
});
