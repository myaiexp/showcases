// penrose example: Layout stages: shape, then label
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout stages: shape, then label',
  summary:
    'The preamble `layout = [shape, label]` runs two solves in order. Points are `? in shape`, label centres are `? in label`, and the distance constraints name their stage with `in`. Watch the readout: the triangle settles first, then the labels slide out next to their points.',
  section: 'Layout Stages',
  tags: ['layout', 'in', 'stage', 'Text', 'Edge'],
  docs: ['repo/packages/docs-site/blog/staged-layout.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
