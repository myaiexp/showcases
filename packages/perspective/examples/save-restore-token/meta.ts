// Perspective example: the save() token as editable JSON, restore() and reset()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'save() and restore() tokens',
  summary:
    'save() serializes the whole viewer state as JSON. Configure the viewer by hand, save, edit the token and restore it; restore() validates and rejects a stringified token. reset() and reset(true) return to the defaults.',
  section: 'Save and Restore',
  tags: ['save', 'restore', 'reset', 'token', 'ViewerConfig', 'toggleConfig'],
  docs: ['repo/docs/md/how_to/javascript/save_restore.md', 'repo/docs/md/how_to/javascript/viewer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
