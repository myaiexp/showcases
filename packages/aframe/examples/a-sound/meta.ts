// aframe example: <a-sound>: a positional sound circling the listener
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-sound>: a positional sound circling the listener',
  summary:
    '<a-sound> is an entity with the sound component: src, autoplay and loop are attributes. The sound is positional, so as its turning parent carries it round the camera the chord moves from ear to ear. The buttons call the component\'s playSound() and stopSound(); the audio is rendered in code.',
  section: 'Primitives',
  tags: ['a-sound', 'sound', 'src', 'autoplay', 'loop', 'positional', 'playSound', 'stopSound'],
  docs: ['repo/docs/primitives/a-sound.md', 'repo/docs/components/sound.md', 'repo/docs/core/asset-management-system.md'],
  audio: true,
  provenance: 'pure',
  added: '2026-11-15',
});
