// d2 example: Models: suspend and unsuspend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Models: suspend and unsuspend',
  summary:
    '`suspend` marks shapes and connections as model-only, hidden from the output, and `unsuspend` brings back chosen ones. One set of models is shown in four ways: whole, top-level only, only connections into Burger King, and only the `likes` edges.',
  section: 'Models',
  tags: ['models', 'suspend', 'unsuspend', 'globs'],
  docs: ['repo/docs/tour/models.md', 'repo/static/d2/suspend.d2', 'repo/static/d2/suspend-2.d2', 'repo/static/d2/suspend-3.d2', 'repo/static/d2/suspend-4.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
