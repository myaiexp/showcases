// g6 example: Tooltip: enable as a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip: enable as a function',
  summary: 'enable can be a function of the event and items: here it returns true only for nodes, so hovering an edge shows nothing.',
  section: 'Plugin',
  tags: ['tooltip', 'enable', 'targetType'],
  docs: ['repo/packages/site/docs/manual/plugin/Tooltip.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
