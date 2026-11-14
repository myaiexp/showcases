// echarts example: Text elements inside renderItem
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Text elements inside renderItem',
  summary:
    'Bubbles with long names drawn by a custom series. Each circle carries a textContent block placed by textConfig.position, and a separate text element shows the value. Change the position, the width and overflow strategy of the name, and the ellipsis it truncates with.',
  section: 'Custom Series',
  tags: ['custom', 'renderItem', 'text', 'textContent', 'textConfig', 'position', 'overflow', 'width', 'ellipsis', 'api.font'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/en/tutorial/custom-series.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
