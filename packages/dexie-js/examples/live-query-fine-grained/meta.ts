// dexie-js example: Only affected queries re-run
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Only affected queries re-run',
  summary:
    'Two live lists watch the same table: children under 18 and people 65 or older. Each one counts how often it had to run. Adding a 99-year-old wakes only the older list, a child\'s birthday only the younger one, and a change to a 40-year-old wakes neither, so a screen only redraws the parts that changed.',
  section: 'liveQuery',
  tags: ['liveQuery()', 'fine-grained observation', 'where().below', 'where().aboveOrEqual', 'modify()'],
  docs: [
    'repo/docs/liveQuery().md',
    'repo/docs/WhereClause/WhereClause.below().md',
    'repo/docs/WhereClause/WhereClause.aboveOrEqual().md',
    'repo/docs/Collection/Collection.modify().md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
