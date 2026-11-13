// echarts example: Restoring the v5 colour palette with a theme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Restoring the v5 colour palette with a theme',
  summary:
    'The v6 upgrade guide recipe for keeping only the old colours: a theme that defines just the v5 default palette, registered with registerTheme. Two charts with the same data, one on the v6 palette and one on the v5 palette, plus a line/bar/pie switch.',
  section: "What's New in 6",
  tags: ['registerTheme', 'color palette', 'init theme', 'v5', 'v6 default theme'],
  docs: [
    'repo/contents/en/basics/release-note/v6-upgrade-guide.md',
    'repo/contents/en/concepts/style.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
