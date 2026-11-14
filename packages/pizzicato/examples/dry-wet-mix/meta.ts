// Pizzicato.js example: the mix option of one effect, from all dry to all wet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dry and wet: how much effect',
  summary:
    'Most effects have a `mix` from 0 to 1: the dry sound is the original, the wet sound is what the effect makes. At 0 you only hear the drum, at 0.5 the drum and its echoes, at 1 only the echoes. The two bars show how much of each is in the mix.',
  section: 'Effects',
  tags: ['mix', 'Delay', 'dry', 'wet'],
  docs: ['repo/README.md', 'repo/src/Effects/Delay.js', 'repo/src/Util.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
