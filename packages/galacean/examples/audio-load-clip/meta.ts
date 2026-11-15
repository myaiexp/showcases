// galacean example: Audio: load a clip from generated WAV bytes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Audio: load a clip from generated WAV bytes",
  summary:
    "A short melody is synthesised as 16-bit PCM, wrapped in a WAV header, turned into a blob URL and loaded with AssetType.Audio. The panel reads the AudioClip's duration, channel count and sample rate, and the waveform is drawn from the same samples. The card is silent; the full view has a Play button.",
  section: "Audio",
  tags: ['AssetType.Audio', 'AudioClip', 'AudioClip.duration', 'AudioClip.channels', 'AudioClip.sampleRate', 'AudioSource.clip'],
  docs: [
    'repo/docs/en/audio/overview.mdx',
    'repo/docs/en/audio/assets.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
