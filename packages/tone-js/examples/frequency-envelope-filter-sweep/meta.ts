// Tone.js example: a FrequencyEnvelope sweeping a filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Open and close a filter with one envelope',
  summary:
    'A FrequencyEnvelope climbs from a base frequency up by a number of octaves and falls back, and it is wired to a filter cutoff. The saw tone goes from muffled to bright and back; more octaves, bigger sweep.',
  section: 'Envelopes',
  tags: ['FrequencyEnvelope', 'baseFrequency', 'octaves', 'Filter', 'frequency', 'connect'],
  docs: ['repo/Envelope.md', 'repo/Tone/component/envelope/FrequencyEnvelope.ts', 'repo/Tone/component/filter/Filter.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
