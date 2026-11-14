// vchart example: Grouped band axis: showAllGroupLayers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grouped band axis: showAllGroupLayers',
  summary:
    'With xField as an array the band axis has one level per field. By default only the innermost labels show; showAllGroupLayers draws every level, and each entry of layers can be hidden on its own.',
  section: 'Concepts: Axes',
  tags: ['showAllGroupLayers', 'axes.layers', 'xField array', 'grouped bar'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Axes.md', 'repo/docs/assets/option/en/component/axis-common/band-axis.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
