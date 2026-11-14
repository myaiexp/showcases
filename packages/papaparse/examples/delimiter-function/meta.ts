// Papa Parse example: a delimiter chosen by a function that reads the text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pick the separator with your own rule',
  summary:
    'Three shops export their price lists three different ways. Give delimiter a function: Papa hands it the whole text and uses whatever separator it returns.',
  section: 'Parse config',
  tags: ['delimiter', 'delimiter function', 'meta.delimiter'],
  docs: ['repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});
