// cosmos-gl example: Pixel ratio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pixel ratio',
  summary:
    'pixelRatio decides how many canvas pixels back each CSS pixel. A low ratio renders fewer pixels and looks blocky; a high one is sharper on high-density screens but uses more GPU memory.',
  section: 'Configuration',
  tags: ['pixelRatio', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
