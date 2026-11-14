// Pizzicato.js example: RingModulator turning a voice into a robot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Robot voice',
  summary:
    'A sung "ah" through a RingModulator: it multiplies the voice by a fast sine wave, which makes the metallic, clangy tone of old sci-fi robots. A low `speed` growls, a high one sounds alien. The card uses a stand-in voice.',
  section: 'Effects',
  tags: ['RingModulator', 'speed', 'distortion', 'mix'],
  docs: ['repo/README.md', 'repo/src/Effects/RingModulator.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
