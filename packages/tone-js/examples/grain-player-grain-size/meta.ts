// Tone.js example: Grain size and overlap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grain size and overlap',
  summary:
    "Tone.GrainPlayer plays a recording as a stream of small overlapping grains. Large grains keep notes recognisable but echo; tiny grains smear into a metallic buzz. grainSize and overlap trade those against each other.",
  section: 'Sources',
  tags: ['GrainPlayer', 'grainSize', 'overlap'],
  docs: ['repo/Sources.md', 'repo/Tone/source/buffer/GrainPlayer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
