// ky example: context is merged shallowly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Context merges one level deep',
  summary:
    'A client can carry default context and each call can add its own. Ky combines them one level deep: new keys are added and clashing top-level keys take the call\'s value, but a nested object is replaced as a whole, not merged. A setting inside it that the call did not repeat is lost.',
  section: 'Fetch and context',
  tags: ['context', 'shallow merge', 'ky.create', 'options.context'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
