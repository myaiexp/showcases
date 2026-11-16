// fabric example: Utilities: vector helpers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: vector helpers',
  summary:
    'util.createVector, magnitude, getUnitVector, getOrthonormalVector and rotateVector applied to a vector between two draggable points: the grey arrow is the vector, green its unit vector, gold its normal, blue a rotated copy.',
  section: 'Utilities',
  tags: ['util.createVector', 'util.magnitude', 'util.getUnitVector', 'util.getOrthonormalVector', 'util.rotateVector'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/createVector.md',
    'repo/src/content/docs/api/namespaces/util/functions/magnitude.md',
    'repo/src/content/docs/api/namespaces/util/functions/getUnitVector.md',
    'repo/src/content/docs/api/namespaces/util/functions/getOrthonormalVector.md',
    'repo/src/content/docs/api/namespaces/util/functions/rotateVector.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
