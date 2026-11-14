// Tone.js example: lookAhead trades a delay after a tap for steadier timing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Delay between a tap and its sound',
  summary:
    'Tone.js plays everything a little after "now" (the lookAhead, 0.1 s by default) so the scheduler is never late. A smaller lookAhead answers a tap faster; a larger one is safer on slow devices.',
  section: 'Context',
  tags: ['Context', 'lookAhead', 'Tone.now', 'immediate'],
  docs: ['repo/Performance.md', 'repo/Time.md', 'repo/Tone/core/context/Context.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
