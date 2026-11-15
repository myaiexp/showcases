// vega example: Time: Multi-Format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time: Multi-Scale Formats',
  summary:
    'Eight dates, each on a different boundary, formatted by the default multi-format timeFormat(), by a custom object specifier, by a plain d3 string and in UTC.',
  section: 'Time',
  tags: ['time.timeFormat', 'time.utcFormat'],
  docs: ['repo/docs/docs/api/time.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
