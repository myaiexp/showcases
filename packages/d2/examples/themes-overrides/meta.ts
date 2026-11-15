// d2 example: Theme overrides in d2-config
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Theme overrides in d2-config',
  summary:
    'The `theme-overrides` and `dark-theme-overrides` keys in `vars.d2-config` replace individual colour codes (B1..B6, AA2.., AB4..) of the chosen theme. The first tab is the plain theme; the others override its colours for light and for dark mode.',
  section: 'Themes',
  tags: ['theme', 'theme-overrides', 'd2-config', 'color codes'],
  docs: ['repo/docs/tour/themes.md', 'repo/docs/tour/vars.md', 'repo/docs/releases/0.6.3.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
