// Pizzicato.js example: play(when, offset) starts a sound later or partway in
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Play later, or from the middle',
  summary:
    'A scale of eight notes, started three ways: at once, after a wait, or skipping straight to the middle. The two numbers you give play(when, offset) are the wait in seconds and the place in the recording to start from.',
  section: 'Using sounds',
  tags: ['Sound', 'play', 'when', 'offset', "source: 'file'"],
  docs: ['repo/README.md', 'repo/src/Sound.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
