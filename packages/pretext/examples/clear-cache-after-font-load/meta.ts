// pretext example: why clearCache() follows a web font that loads after prepare()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fallback widths until clearCache()',
  summary:
    'Text prepared before its web font loads carries the fallback font\'s widths. Step through the story: prepare early, load the font, check the old handle against the DOM, then clearCache() and prepare again.',
  section: 'Other helpers',
  tags: ['clearCache', 'FontFace', 'document.fonts', 'prepare', 'web fonts'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
