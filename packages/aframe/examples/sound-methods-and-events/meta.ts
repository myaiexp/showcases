// aframe example: sound: playSound, pauseSound, stopSound, sound-loaded and sound-ended
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sound: playSound, pauseSound, stopSound, sound-loaded and sound-ended",
  summary: "A looping pad on an entity, controlled from buttons through the component's methods, as in the docs: entity.components.sound.playSound(), pauseSound() and stopSound(). The sound-loaded and sound-ended events are logged with their detail, and the loop property can be toggled.",
  section: 'Components',
  tags: ["sound", "playSound", "pauseSound", "stopSound", "sound-loaded", "sound-ended", "loop", "components.sound"],
  docs: ["repo/docs/components/sound.md"],
  provenance: 'pure',
  audio: true,
  added: '2026-11-15',
});
