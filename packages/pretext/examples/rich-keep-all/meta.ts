// Pretext example: keep-all word breaking in rich inline Korean text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Korean mentions with keep-all',
  summary:
    "A Korean message with @mentions and a bold run is prepared twice, by default and with { wordBreak: 'keep-all' }. Default can break between any syllables; keep-all breaks only at spaces, as CSS word-break: keep-all does.",
  section: 'Rich inline',
  tags: ['keep-all', 'wordBreak', 'Korean', 'CJK'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
