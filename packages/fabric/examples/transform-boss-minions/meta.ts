// fabric example: Transformations: A boss and its minions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transformations: A boss and its minions',
  summary:
    "The guide's real use case: store each minion's matrix relative to the boss as inverse(boss) x minion, then rebuild minion = boss x relation on every boss move, rotate or scale with applyTransformToObject.",
  section: 'Transformations',
  tags: ['invertTransform','multiplyTransformMatrices','applyTransformToObject','calcTransformMatrix','moving','rotating','scaling'],
  docs: ['repo/src/content/docs/docs/Old docs/using-transformations.mdx', 'repo/src/content/docs/docs/Old docs/using-transformations.jsx', 'repo/src/content/docs/api/namespaces/util/functions/invertTransform.md', 'repo/src/content/docs/api/namespaces/util/functions/multiplyTransformMatrices.md', 'repo/src/content/docs/api/namespaces/util/functions/applyTransformToObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
