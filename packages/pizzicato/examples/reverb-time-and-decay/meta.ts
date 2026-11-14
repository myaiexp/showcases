// Pizzicato.js example: Reverb's time and decay, from a bathroom to a church
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bathroom or church',
  summary:
    'Reverb builds the echo of a room in code: `time` is how long it rings, `decay` how fast it dies away. Short and quick is a tiled bathroom; long and slow is a stone church. The shaded curve is the room\'s tail after one chime.',
  section: 'Effects',
  tags: ['Reverb', 'time', 'decay', 'mix'],
  docs: ['repo/README.md', 'repo/src/Effects/Reverb.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
