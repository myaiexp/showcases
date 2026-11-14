// Tone.js example: Hertz as a length of time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hertz as a length of time',
  summary:
    'Time also reads hertz: "5hz" is a fifth of a second. Raise it and slow clicks speed up until at "40hz" they melt into a buzzing tone: the border between rhythm and pitch.',
  section: 'Time',
  tags: ['Time', 'hz', 'toSeconds'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
