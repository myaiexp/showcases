// Pizzicato.js example: StereoPanner moving a sound between the left and right speakers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sound moving left to right',
  summary:
    'A tune that drifts from your left ear to your right and back, like a passing car: StereoPanner sends the sound through the speakers by its `pan` value, -1 all left, 0 centre, 1 all right. The dot follows the sound; headphones help.',
  section: 'Effects',
  tags: ['StereoPanner', 'pan', 'stereo'],
  docs: ['repo/README.md', 'repo/src/Effects/StereoPanner.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
