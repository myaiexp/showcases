// babylon-js example: Looping and volume ramps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Looping and volume ramps',
  summary:
    'An A major chord of synthesized tones, each looped one of the three documented ways: the loop option, the loop property, and play({ loop: true }). setVolume fades each tone with a duration and an AudioParameterRampShape; audioEngine.volume scales them all.',
  section: 'Audio',
  tags: ['loop', 'setVolume', 'AudioParameterRampShape', 'AudioEngineV2.volume'],
  docs: ['repo/content/features/featuresDeepDive/audio/v2/playingSoundsMusic.md'],
  provenance: 'pure',
  audio: true,
  added: '2026-11-13',
});
