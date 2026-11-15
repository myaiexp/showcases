// embedding-atlas example: chartTheme light and dark chosen by colorScheme
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Chart theme per color scheme",
  summary:
    "chartTheme takes light and dark sub-objects, and colorScheme picks which one applies. The two variants render the same chart theme under dark and light, so markColor flips between orange and navy and the chart background follows.",
  section: "Charts",
  tags: ['chartTheme', 'light', 'dark', 'colorScheme', 'markColor'],
  docs: [
    'repo/packages/viewer/src/charts/common/theme.ts',
    'repo/packages/viewer/src/api.ts',
    'repo/packages/docs/embedding-atlas.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
