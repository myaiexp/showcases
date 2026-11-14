// Same answer, four ways to read it: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Same answer, four ways to read it',
  summary:
    'One address, read four ways: .json() gives an object, .text() the raw characters, .res() the Response with its status and headers, .blob() a chunk of bytes with a type. Four panes show what each one hands back.',
  section: 'Quick start',
  tags: ['json', 'text', 'res', 'blob', 'response types'],
  docs: ['repo/README.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
