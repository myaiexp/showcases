// galacean example: Audio assets: the WAV file and format support
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Audio assets: the WAV file and format support",
  summary:
    "The docs name MP3, WAV and OGG as supported formats. This builds a WAV file byte by byte (the RIFF header is printed in hex), loads it as an AudioClip and compares the decoded clip with what was written; the panel also lists which of the three formats this browser can decode.",
  section: "Audio",
  tags: ['AssetType.Audio', 'AudioClip.sampleRate', 'AudioClip.channels'],
  docs: [
    'repo/docs/en/audio/assets.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
