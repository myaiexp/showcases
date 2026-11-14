// deck-gl example: MaskExtension maskByInstance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MaskExtension maskByInstance',
  summary:
    'maskByInstance chooses whether a big disc is kept whole when its centre is inside the mask, or masked by its actual shape so the disc is cut at the edge.',
  section: 'Extensions',
  tags: ['MaskExtension', 'maskByInstance'],
  docs: [
    'repo/docs/api-reference/extensions/mask-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
