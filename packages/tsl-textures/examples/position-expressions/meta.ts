// tsl-textures example: Position expressions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position expressions',
  summary:
    'The position parameter accepts any TSL vec3 expression. Dalmatian spots three ways: on positionGeometry, on positionGeometry scaled on y so the spots stretch, and on positionGeometry plus time so they scroll.',
  section: 'Getting started',
  tags: ['position', 'positionGeometry', 'time', 'dalmatianSpots'],
  docs: ['repo/CHANGELOG.md', 'repo/docs/dalmatian-spots.md', 'repo/src/dalmatian-spots.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
