// Pizzicato.js example: Tremolo wobbling the volume like an old guitar amp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Old guitar amp wobble',
  summary:
    'Tremolo turns the volume up and down, fast: `speed` is how many wobbles a second, `depth` how far the volume dips. Slow and shallow is a gentle shimmer, fast and deep is a stuttering pulse. The loudness bar rises and falls with it.',
  section: 'Effects',
  tags: ['Tremolo', 'speed', 'depth', 'mix'],
  docs: ['repo/README.md', 'repo/src/Effects/Tremolo.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
