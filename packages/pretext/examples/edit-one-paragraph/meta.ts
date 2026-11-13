// Pretext example: keep per-paragraph prepared handles and rebuild only the edited ones
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Re-prepare only the edited paragraph',
  summary:
    'The text is split into paragraphs with split(/(?<=\\n)/), each prepared in pre-wrap. An edit rebuilds only the handles it touched while layout() sums line counts and height over all of them.',
  section: 'Measure height',
  tags: ['prepare', 'pre-wrap', 'editor', 'incremental'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
