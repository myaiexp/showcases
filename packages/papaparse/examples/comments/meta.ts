// Papa Parse example: comment lines skipped with the comments option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Skip the commented lines',
  summary:
    '"I forgot to mention: my CSV files have comments in them." Tell Papa which string starts a comment, such as # or //, and every line that begins with it is skipped instead of becoming a row.',
  section: 'Parse config',
  tags: ['comments'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
