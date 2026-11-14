// Pizzicato.js example: PingPongDelay echoes that bounce between the speakers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Echoes that bounce left and right',
  summary:
    'PingPongDelay is a Delay whose echoes take turns: one in the left speaker, the next in the right. Wear headphones in the full view; the card lights the speaker each echo comes from.',
  section: 'Effects',
  tags: ['PingPongDelay', 'feedback', 'time', 'mix', 'stereo'],
  docs: ['repo/README.md', 'repo/src/Effects/PingPongDelay.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
