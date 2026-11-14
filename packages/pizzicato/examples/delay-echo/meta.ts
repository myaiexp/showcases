// Pizzicato.js example: the Delay effect's feedback and time as an echo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A shout in a canyon',
  summary:
    'One short shout, then the canyon answers: Delay repeats the sound after `time` seconds, each repeat quieter by `feedback`. The bars show the shout and every echo; the card tries three feedback settings.',
  section: 'Effects',
  tags: ['Delay', 'feedback', 'time', 'mix', 'echo'],
  docs: ['repo/README.md', 'repo/src/Effects/Delay.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
