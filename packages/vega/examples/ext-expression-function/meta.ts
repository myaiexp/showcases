// vega example: Extensibility: Expression Function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensibility: Custom Expression Functions',
  summary:
    'Two functions added with vega.expressionFunction, showcaseWobble and showcaseSnap, called from encode expressions: 36 wobbling points (blue) and their values snapped to a grid (orange) whose size a slider sets.',
  section: 'Extensibility',
  tags: ['extensibility.expressionFunction', 'signal.bind', 'mark.symbol'],
  docs: ['repo/docs/docs/api/extensibility.md', 'repo/docs/docs/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
