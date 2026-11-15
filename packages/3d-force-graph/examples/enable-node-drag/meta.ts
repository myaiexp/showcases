// 3d-force-graph example: Interaction: enableNodeDrag
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interaction: enableNodeDrag",
  summary:
    "enableNodeDrag toggles dragging nodes with the mouse (d3 engine only). The drag controls are built when a data update finishes, so the data is set again after the toggle; the card reports how far each fake drag moved the node.",
  section: "Interaction",
  tags: ['enableNodeDrag', 'graphData'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
