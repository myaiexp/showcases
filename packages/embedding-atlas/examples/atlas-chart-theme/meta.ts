// embedding-atlas example: the chartTheme prop and its light and dark blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chart theme',
  summary:
    'chartTheme overrides the charts\' look: markColor and its fade (a brush on the words chart shows both), label font and colour, gridColor and brushFill. Keys under light and dark apply only in that colorScheme, so the last variant changes with the colorScheme select.',
  section: 'EmbeddingAtlas',
  tags: ['chartTheme', 'ChartThemeConfig', 'markColor', 'light', 'dark'],
  docs: ['repo/packages/viewer/src/charts/common/theme.ts', 'repo/packages/viewer/src/api.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
