// galacean example: Particle duration and loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle duration and loop",
  summary:
    "A one-shot burst with main.isLoop off and a duration of 1.5 seconds: it ends and replays only when play() is called again. Controls toggle looping and change the duration in the full view.",
  section: "Particle",
  tags: ['main.duration', 'main.isLoop', 'generator.isAlive', 'play'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
