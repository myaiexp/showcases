// Pizzicato.js example: a siren made by sweeping a wave's frequency with timed steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A siren from a sliding pitch',
  summary:
    'Set the frequency of a playing wave many times a second and it glides, which is all a siren is. The card compares a slow wail, a fast yelp and a two-tone alarm, each just a different pattern of frequency values.',
  section: 'Using sounds',
  tags: ['Sound', 'frequency', 'wave', 'play'],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
