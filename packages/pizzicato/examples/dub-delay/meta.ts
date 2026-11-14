// Pizzicato.js example: DubDelay, an echo that gets darker on every repeat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dub echo that fades to dark',
  summary:
    'DubDelay runs every repeat through a filter, so each echo loses more of its brightness, like the echo units of old dub records. `cutoff` sets the filter: the lower it is, the faster the echoes go dull.',
  section: 'Effects',
  tags: ['DubDelay', 'cutoff', 'feedback', 'time', 'mix'],
  docs: ['repo/README.md', 'repo/src/Effects/DubDelay.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
