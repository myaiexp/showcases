// pretext example: prepare and lay out text inside a Web Worker
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prepare and lay out in a worker',
  summary:
    'A module worker calls setLocale() with the page\'s language, loads a font into its own FontFaceSet, prepares a batch of messages once and answers each width with heights. The main thread only paints.',
  section: 'Other helpers',
  tags: ['Worker', 'setLocale', 'prepare', 'layout', 'off main thread'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
