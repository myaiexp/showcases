// Perspective example: live and cloned Views, and getViewConfig()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Borrowed and cloned Views',
  summary:
    'getView() lends the panel\'s live View, which the next config change deletes; ask it after a regroup and it fails. getView({ mode: "clone" }) builds an independent View that the caller reads and deletes. getViewConfig() reports the current query.',
  section: 'Viewer',
  tags: ['getView', 'clone', 'live View', 'getViewConfig', 'to_columns'],
  docs: ['repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
