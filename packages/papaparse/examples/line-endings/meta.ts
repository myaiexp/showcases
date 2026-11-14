// Papa Parse example: Windows, Mac and Linux line endings, and newline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Windows, Mac and Linux line endings',
  summary:
    'Different systems end a line differently: \\n, \\r\\n or \\r. Papa finds out which one the text uses and reports it in meta.linebreak. You can also force one with the newline option, and see what happens when you force the wrong one.',
  section: 'Parse config',
  tags: ['newline', 'meta.linebreak', 'line endings'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
