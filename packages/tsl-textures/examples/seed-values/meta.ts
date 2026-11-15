// tsl-textures example: Seed values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seed values',
  summary:
    'The seed parameter is "a number for the random generator, each value generates specific pattern": six gas giants with default parameters and seeds 0 to 5, and a button that rebuilds them with random seeds.',
  section: 'Getting started',
  tags: ['seed', 'gasGiant', 'needsUpdate'],
  docs: ['repo/docs/gas-giant.md', 'repo/src/gas-giant.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
