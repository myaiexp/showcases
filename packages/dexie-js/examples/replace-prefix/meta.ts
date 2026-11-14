// dexie-js example: Move a folder with replacePrefix()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Move a folder with replacePrefix()',
  summary:
    'Files are stored with a path. Renaming the drafts/ folder means changing the start of every path inside it, subfolders included: one query finds them and replacePrefix() swaps the beginning. drafts-2/ is left alone because its path does not start with drafts/.',
  section: 'Prop modifications',
  tags: ['replacePrefix()', 'modify()', 'startsWith()'],
  docs: [
    'repo/docs/PropModification/replacePrefix().md',
    'repo/docs/Collection/Collection.modify().md',
    'repo/docs/WhereClause/WhereClause.startsWith().md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
