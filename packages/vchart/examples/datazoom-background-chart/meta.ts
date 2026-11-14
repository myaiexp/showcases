// vchart example: DataZoom background and selected charts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DataZoom background and selected charts',
  summary:
    'The thumbnail inside a DataZoom: backgroundChart (line and area) and selectedBackgroundChart for the selected part, with showBackgroundChart to switch it off. The selection slides along the data in the card.',
  section: 'Concepts: Components',
  tags: ['dataZoom', 'showBackgroundChart', 'backgroundChart', 'selectedBackgroundChart'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Datazoom.md',
    'repo/docs/assets/option/en/component/data-zoom.md',
    'repo/docs/assets/option/en/component/data-filter-component-common/data-filter-base-component.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
