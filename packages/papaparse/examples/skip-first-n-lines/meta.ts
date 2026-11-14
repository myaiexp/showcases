// Papa Parse example: skipFirstNLines drops a preamble before the header
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skip the preamble above the header',
  summary:
    'Bank exports often start with a title and an account number before the real header line. skipFirstNLines: n throws those lines away before parsing, so the header is read from the right place.',
  section: 'Parse config',
  tags: ['skipFirstNLines', 'header'],
  docs: ['repo/docs/docs.html', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
