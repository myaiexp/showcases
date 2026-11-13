// babylon-js example: Sound instances, pitch and playback rate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sound instances, pitch and playback rate',
  summary:
    'CreateAudioEngineAsync with its unmute button, then CreateSoundAsync from a synthesized AudioBuffer. Every play() starts an instance; maxInstances stops the oldest past the cap, and pitch and playbackRate apply only to instances started after the change. Bars show activeInstancesCount.',
  section: 'Audio',
  tags: ['CreateAudioEngineAsync', 'CreateSoundAsync', 'maxInstances', 'pitch', 'playbackRate'],
  docs: ['repo/content/features/featuresDeepDive/audio/v2/playingSoundsMusic.md'],
  provenance: 'pure',
  audio: true,
  added: '2026-11-13',
});
