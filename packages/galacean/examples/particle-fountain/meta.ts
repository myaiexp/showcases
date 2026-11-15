// galacean example: Particle fountain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle fountain",
  summary:
    "A fountain: a very narrow ConeShape at high start speed, pulled back down by gravityModifier. Sliders for gravity and cone angle in the full view.",
  section: "Particle",
  tags: ['ConeShape', 'gravityModifier', 'startSpeed'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
