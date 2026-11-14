// deck-gl example: Browser blending with mix-blend-mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Browser blending with mix-blend-mode',
  summary:
    "The Deck canvas sits over page content, so the browser composites it. Setting the CSS mix-blend-mode of the canvas to multiply keeps the overlay colours but lets the dark lines and labels of the layer beneath show through.",
  section: 'Data and performance',
  tags: ['mix-blend-mode', 'multiply', 'isolation', 'canvas', 'CSS'],
  docs: [
    'repo/docs/developer-guide/tips-and-tricks.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
