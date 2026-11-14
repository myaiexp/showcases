// Tone.js example: Samples as a length of time
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Samples as a length of time',
  summary:
    '"22050samples" is a length counted in audio samples, so its seconds depend on the sample rate. Four sample counts click at spacings from a second down to a hundredth.',
  section: 'Time',
  tags: ['Time', 'samples', 'toSeconds', 'sampleRate'],
  docs: ['repo/Time.md', 'repo/Tone/core/type/Time.ts', 'repo/Tone/core/type/TimeBase.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
