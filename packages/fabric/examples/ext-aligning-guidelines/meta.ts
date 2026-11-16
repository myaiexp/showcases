// fabric example: Extensions: AligningGuidelines snap lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensions: AligningGuidelines snap lines',
  summary:
    'new AligningGuidelines(canvas) from fabric/extensions draws red guide lines and snaps a dragged or scaled shape to its neighbours\' edges and centres. closeVLine and closeHLine turn off one direction; dispose() removes it.',
  section: 'Extensions',
  tags: ['AligningGuidelines', 'closeVLine', 'closeHLine', 'dispose', 'object:moving'],
  docs: [
    'repo/extensions/aligning_guidelines/README.MD',
    'repo/extensions/README.MD',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
