// Tone.js example: Limiter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A ceiling for the loudest peaks',
  summary:
    'A Limiter is a compressor with the ratio turned all the way up and a very fast attack, so nothing gets louder than its threshold. Push a drum loop into it and lower the ceiling: the peaks are shaved flat and the level bar drops.',
  section: 'Dynamics',
  tags: ['Limiter', 'threshold'],
  docs: ['repo/Tone/component/dynamics/Limiter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
