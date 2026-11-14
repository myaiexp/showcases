// playcanvas example: Sound component slots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sound component slots",
  summary: "One sound component with four slots over two synthesised clips: a looping bed, a phrase, and two overlap slots that play parts of the phrase by startTime and duration, one at half pitch. Volume and pitch also scale at the component level.",
  section: "Components",
  tags: ["SoundComponent","addSlot","loop","overlap","startTime","duration","volume","pitch"],
  docs: ["repo/docs/user-manual/editor/scenes/components/sound.md"],
  provenance: 'pure',
  added: '2026-11-14',
  audio: true,
});
