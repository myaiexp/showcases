// pretext example: why the painted text needs overflow-wrap: break-word
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Why overflow-wrap: break-word',
  summary:
    'Pretext breaks a word that does not fit a line between graphemes, which is overflow-wrap: break-word, not the CSS default. The same long token painted both ways: one agrees with layout(), the other overflows and disagrees.',
  section: 'Caveats',
  tags: ['overflow-wrap', 'break-word', 'layout', 'long words', 'height'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
