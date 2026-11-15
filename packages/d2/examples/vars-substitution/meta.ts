// d2 example: Variables and substitution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Variables and substitution',
  summary:
    'A `vars` map defines values and `${name}` substitutes them, with `.` reaching into nested maps. The first tab fills two labels from one variable; the second pulls a fill and a stroke out of a nested map.',
  section: 'Variables',
  tags: ['vars', 'substitution', 'nested'],
  docs: ['repo/docs/tour/vars.md', 'repo/static/d2/vars-intro.d2', 'repo/static/d2/vars-nested.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
