// aframe example: Guide: audio, background noise and positional a-sound
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Guide: audio, background noise and positional a-sound',
  summary:
    'An <audio> in <a-assets> with autoplay and preload, and a positional <a-sound> placed at 3 metres to the left that gets louder as you approach it. The rumble is generated in code. Press play in the full view.',
  section: 'Guides',
  tags: ['audio', 'a-sound', 'autoplay', 'preload', 'a-assets', 'position'],
  docs: ['repo/docs/guides/building-a-basic-scene.md', 'repo/docs/primitives/a-sound.md', 'repo/docs/core/asset-management-system.md'],
  provenance: 'pure',
  added: '2026-11-15',
  audio: true,
});
