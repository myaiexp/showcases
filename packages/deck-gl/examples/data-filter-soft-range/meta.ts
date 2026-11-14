// deck-gl example: DataFilterExtension soft range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DataFilterExtension soft range',
  summary:
    'filterSoftRange fades dots between it and filterRange instead of hiding them abruptly; filterTransformSize and filterTransformColor choose whether a faded dot shrinks, turns translucent, or both.',
  section: 'Extensions',
  tags: ['DataFilterExtension', 'filterSoftRange', 'filterTransformSize', 'filterTransformColor'],
  docs: [
    'repo/docs/api-reference/extensions/data-filter-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
