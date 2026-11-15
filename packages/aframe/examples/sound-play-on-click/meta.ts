// aframe example: sound: on: click plays a sound from an entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "sound: on: click plays a sound from an entity",
  summary: "The docs' tickle example: a box has sound=src: #blip; on: click, and a mouse cursor on the scene turns canvas clicks into click events, so each click plays the sound. The sound is a short blip rendered in code. Click the box with sound on.",
  section: 'Components',
  tags: ["sound", "src", "on", "click", "cursor", "rayOrigin", "audio"],
  docs: ["repo/docs/components/sound.md", "repo/docs/components/cursor.md"],
  provenance: 'pure',
  audio: true,
  added: '2026-11-15',
});
