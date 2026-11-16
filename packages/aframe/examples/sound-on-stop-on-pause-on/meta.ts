// aframe example: sound: on, stopOn and pauseOn events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sound: on, stopOn and pauseOn events",
  summary: "The sound component can listen for events to start, stop and pause. A sound with on: zone-enter, stopOn: zone-leave and pauseOn: menu-open is driven by buttons that emit those events on the entity; a paused sound resumes where it left off, a stopped one starts from the beginning.",
  section: 'Components',
  tags: ["sound", "on", "stopOn", "pauseOn", "emit", "loop", "events"],
  docs: ["repo/docs/components/sound.md"],
  provenance: 'pure',
  audio: true,
  added: '2026-11-15',
});
