// observable-plot example: Bin: density with continuous marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bin: density with continuous marks',
  summary:
    'areaY and lineY over binned counts. With filter set to null the empty bins are kept, so the shape drops to zero; with the default they are skipped and the line cuts across gaps.',
  section: 'Transform: Bin',
  tags: ['binX', 'areaY', 'lineY', 'filter'],
  docs: ['repo/docs/transforms/bin.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
