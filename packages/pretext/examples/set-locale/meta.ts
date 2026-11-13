// pretext example: lay the same text out under several setLocale() languages
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lay out under another locale',
  summary:
    'setLocale() picks the language prepare() breaks and measures under. The same text is prepared under en, zh, ja and ko and laid out at one width, and the lines that differ are highlighted.',
  section: 'Other helpers',
  tags: ['setLocale', 'prepareWithSegments', 'layoutWithLines', 'locale', 'line breaks'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
