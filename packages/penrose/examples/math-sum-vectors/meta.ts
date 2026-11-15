// penrose example: sumVectors as a head-to-tail chain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sumVectors as a head-to-tail chain',
  summary:
    'Four sampled vectors are laid head to tail from one corner. `sumVectors` adds the list, and the thick red arrow from the start to the chain\'s end is exactly that sum.',
  section: 'Computation: Math',
  tags: ['sumVectors', 'vmul'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
