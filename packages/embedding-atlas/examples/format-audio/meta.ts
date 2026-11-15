// embedding-atlas example: the audio renderer on WAV data URLs, no autoplay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Audio column",
  summary:
    "A column of data:audio/wav URLs rendered as audio players with { renderer: \"audio\" }. The WAV beeps are generated in code; nothing plays until you press play on a row.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: audio', 'data URL', 'WAV'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
