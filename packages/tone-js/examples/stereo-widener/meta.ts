// tone-js example: Make a sound wider or fold it to mono
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Make a sound wider or fold it to mono",
  summary:
    "Tone.StereoWidener scales the difference between left and right. Width 0 collapses to mono (the two traces match), 0.5 leaves it alone, and 1 keeps only the side signal.",
  section: 'Effects',
  tags: ['StereoWidener', 'width', 'Chorus'],
  docs: ['repo/Tone/effect/StereoWidener.ts', 'repo/Tone/effect/MidSideEffect.ts', 'repo/Tone/effect/Chorus.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
