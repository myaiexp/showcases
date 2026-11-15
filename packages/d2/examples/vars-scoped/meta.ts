// d2 example: Variables: scope
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Variables: scope',
  summary:
    'Substitutions look outward to the nearest enclosing `vars`, never inward. `lb` sees the root `region` (Global) while `server` inside `zone1` sees its own, nearer `region` (us-east-1).',
  section: 'Variables',
  tags: ['vars', 'scope'],
  docs: ['repo/docs/tour/vars.md', 'repo/static/d2/vars-scoped.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
