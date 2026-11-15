// embedding-atlas example: labels whose content is an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image labels',
  summary:
    'A label\'s content can be { image, width, height } instead of a string. Each topic gets a coloured badge, drawn on a canvas and passed as a data URL, shown at 72×40 at the topic\'s centre.',
  section: 'EmbeddingView',
  tags: ['labels', 'LabelContent', 'image', 'defaultCategoryColors'],
  docs: ['repo/packages/component/src/lib/embedding_view/types.ts', 'repo/packages/component/src/lib/index.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
