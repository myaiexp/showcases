// deck-gl example: ClipExtension clipByInstance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ClipExtension clipByInstance',
  summary:
    'clipByInstance decides whether an object is kept or dropped by its anchor, or cut by its geometry: big discs at a clip edge either vanish whole or are sliced.',
  section: 'Extensions',
  tags: ['ClipExtension', 'clipByInstance', 'ScatterplotLayer'],
  docs: [
    'repo/docs/api-reference/extensions/clip-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
