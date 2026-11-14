// ky example: throwHttpErrors false for availability checks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Checking if files exist (no throwing)',
  summary:
    'Sometimes a 404 is not a problem but the answer you were after, for example when you check which files exist. Setting throwHttpErrors to false makes Ky return error answers like any other, so one missing file does not stop the whole check. The default (true) shows what would happen otherwise.',
  section: 'HTTP errors',
  tags: ['throwHttpErrors', 'HEAD', '404', 'availability'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
