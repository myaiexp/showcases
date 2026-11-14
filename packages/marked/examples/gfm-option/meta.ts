// marked example: GitHub extras: gfm
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GitHub extras: gfm',
  summary:
    'The same notes rendered twice. With gfm: true (the default) pipes become a table, [x] becomes a checkbox, ~~text~~ is struck through and a bare web address becomes a link; with gfm: false all of that stays plain text.',
  section: 'Options',
  tags: ['gfm', 'new Marked', 'options', 'tables'],
  docs: ['repo/docs/USING_ADVANCED.md', 'repo/src/defaults.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
