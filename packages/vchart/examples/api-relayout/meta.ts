// vchart example: API: setLayout and reLayout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: setLayout and reLayout',
  summary:
    'setLayout installs a layout function that places the regions; reLayout runs it again without changing the spec. The function reads a gap variable, so moving the slider and calling reLayout pulls two pies apart or together. The card swings the gap.',
  section: 'API',
  tags: ['setLayout', 'reLayout', 'layout', 'region', 'setLayoutStartPosition', 'setLayoutRect'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
