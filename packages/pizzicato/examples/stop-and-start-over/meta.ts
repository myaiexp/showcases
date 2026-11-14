// Pizzicato.js example: stop() forgets the place, so the next play() starts over
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stop and start over',
  summary:
    'stop() ends a sound and forgets how far it got, so the next play() begins again from the very start. The playhead jumps back to the beginning of the scale, unlike pause(), which would have carried on.',
  section: 'Using sounds',
  tags: ['Sound', 'stop', 'play', "source: 'file'"],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
