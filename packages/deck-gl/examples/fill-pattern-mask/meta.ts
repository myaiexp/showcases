// deck-gl example: FillStyleExtension fillPatternMask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FillStyleExtension fillPatternMask',
  summary:
    'fillPatternMask true treats the atlas as a stencil painted with getFillColor; false draws the atlas pixels as they are. The same coloured atlas both ways.',
  section: 'Extensions',
  tags: ['FillStyleExtension', 'fillPatternMask', 'fillPatternAtlas'],
  docs: [
    'repo/docs/api-reference/extensions/fill-style-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
