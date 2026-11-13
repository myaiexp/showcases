// Pretext example: development-time check that labels do not wrap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Catch labels that wrap',
  summary:
    'Ten translations of one button label are checked at a chosen button width: any label whose layout() lineCount is above one is flagged red, with no browser layout involved.',
  section: 'Measure height',
  tags: ['labels', 'i18n', 'verification', 'lineCount'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
