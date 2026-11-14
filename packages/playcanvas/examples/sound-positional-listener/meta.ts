// playcanvas example: Positional sound and the audio listener
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Positional sound and the audio listener",
  summary: "A beeping source circles the camera, which carries the audiolistener component. positional, refDistance, maxDistance, rollOffFactor and distanceModel shape how it fades with distance.",
  section: "Components",
  tags: ["positional","AudioListenerComponent","refDistance","maxDistance","rollOffFactor","distanceModel","DISTANCE_INVERSE"],
  docs: ["repo/docs/user-manual/editor/scenes/components/sound.md","repo/docs/user-manual/editor/scenes/components/audiolistener.md"],
  provenance: 'pure',
  added: '2026-11-14',
  audio: true,
});
