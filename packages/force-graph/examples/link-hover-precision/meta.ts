// force-graph example: Interaction: linkHoverPrecision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interaction: linkHoverPrecision',
  summary:
    'linkHoverPrecision is how far from a link\'s line the pointer can be and still hover it. The pointer rests a few pixels beside a link: with low precision nothing happens, with high precision the link lights up.',
  section: 'Interaction',
  tags: ['linkHoverPrecision', 'onLinkHover', 'linkLabel'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
