// pretext example: mixed-direction paragraphs painted as one DOM element each
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mixed-direction paragraphs',
  summary:
    'Pretext gives the height and lines of English plus Arabic and Hebrew text. Paint each paragraph as one DOM element with its direction set and the browser orders every line; painting lines one by one on a canvas orders each line as its own paragraph.',
  section: 'Caveats',
  tags: ['bidi', 'rtl', 'Arabic', 'Hebrew', 'canvas', 'pre-wrap'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
