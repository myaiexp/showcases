// Pizzicato.js example: a sound board of four file sounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drum pads',
  summary:
    'Load a few short recordings as file sounds and play each from its own pad: kick, snare, hi-hat and clap. The card plays a beat; in the full view tap the pads yourself.',
  section: 'Create a sound',
  tags: ['Sound', "source: 'file'", 'play', 'sound board'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
