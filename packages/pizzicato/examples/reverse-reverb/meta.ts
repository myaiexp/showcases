// Pizzicato.js example: Reverb's reverse option, a tail that swells instead of fading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ghostly swelling reverb',
  summary:
    'A normal reverb dies away after the note. With `reverse: true` the echo does the opposite: it grows louder and louder, then cuts off, a ghostly swell used in film scores. The shaded curve shows the tail, fading or swelling.',
  section: 'Effects',
  tags: ['Reverb', 'reverse', 'time', 'decay'],
  docs: ['repo/README.md', 'repo/src/Effects/Reverb.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
