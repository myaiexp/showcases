// tsl-textures example: The position parameter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The position parameter',
  summary:
    "Every texture maps through its position parameter, positionGeometry by default. Passing TSL's positionWorld instead fixes the camouflage pattern in the scene, so a moving sphere slides through it while the default one carries its pattern along.",
  section: 'Getting started',
  tags: ['position', 'positionGeometry', 'positionWorld', 'camouflage'],
  docs: ['repo/CHANGELOG.md', 'repo/docs/camouflage.md', 'repo/src/camouflage.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
