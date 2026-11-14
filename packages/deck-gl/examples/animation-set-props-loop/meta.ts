// deck-gl example: Layer animation with a setProps loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer animation with a setProps loop',
  summary:
    'A requestAnimationFrame loop calls deck.setProps with a new radiusScale and opacity every frame: the cheap uniform props the guide recommends for custom animation, with accessors left untouched.',
  section: 'Animations and transitions',
  tags: ['setProps', 'radiusScale', 'opacity', 'custom animation'],
  docs: [
    'repo/docs/developer-guide/animations-and-transitions.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
