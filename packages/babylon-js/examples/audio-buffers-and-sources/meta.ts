// babylon-js example: Sound buffers, streaming and WebAudio sources
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sound buffers, streaming and WebAudio sources',
  summary:
    'Three kinds of source: two StaticSounds sharing one CreateSoundBufferAsync buffer at different playback rates, a CreateStreamingSoundAsync sound playing a WAV from a blob URL through a media element, and an OscillatorNode wrapped by CreateSoundSourceAsync on the engine’s own AudioContext.',
  section: 'Audio',
  tags: ['CreateSoundBufferAsync', 'CreateStreamingSoundAsync', 'CreateSoundSourceAsync', 'StaticSoundBuffer'],
  docs: ['repo/content/features/featuresDeepDive/audio/v2/playingSoundsMusic.md'],
  provenance: 'pure',
  audio: true,
  added: '2026-11-13',
});
