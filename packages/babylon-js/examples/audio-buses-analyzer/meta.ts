// babylon-js example: Audio buses, stereo pan and analyzer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Audio buses, stereo pan and analyzer',
  summary:
    'A loop and a drone routed through an intermediate AudioBus by setting outBus. The bus pans with stereo.pan, and its analyzer’s getByteFrequencyData drives a bar per frequency band. Buttons reroute the drone between the bus and the default main bus.',
  section: 'Audio',
  tags: ['CreateAudioBusAsync', 'outBus', 'stereo.pan', 'analyzer', 'MainAudioBus'],
  docs: ['repo/content/features/featuresDeepDive/audio/v2/playingSoundsMusic.md'],
  provenance: 'pure',
  audio: true,
  added: '2026-11-13',
});
