// deck-gl example: MaskExtension multiple masks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MaskExtension multiple masks',
  summary:
    'Three mask layers (two circles and a band) work at once, each dot layer naming its own maskId. The docs allow up to four masks together.',
  section: 'Extensions',
  tags: ['MaskExtension', 'maskId', 'operation'],
  docs: [
    'repo/docs/api-reference/extensions/mask-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
