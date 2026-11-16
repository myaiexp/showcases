// fabric example: Utilities: stylesFromArray and stylesToArray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: stylesFromArray and stylesToArray',
  summary:
    'Text styles written as { start, end, style } ranges are turned into the per-line, per-character styles object with util.stylesFromArray, and util.stylesToArray folds it back into ranges. Move the range and read both forms.',
  section: 'Utilities',
  tags: ['util.stylesFromArray', 'util.stylesToArray', 'styles', 'FabricText'],
  docs: [
    'repo/src/content/docs/api/namespaces/util/functions/stylesFromArray.md',
    'repo/src/content/docs/api/namespaces/util/functions/stylesToArray.md',
    'repo/src/content/docs/api/classes/FabricText.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
