// Zod example: stringbool fields in an object turn env text into booleans
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read an .env file of on and off flags',
  summary:
    "A settings file spells every flag as text: DEBUG=on, CACHE=0, TELEMETRY=disabled. A schema of stringbool fields reads them into a settings object of real true and false values, and names the flag whose word it does not recognise.",
  section: 'Numbers, dates and enums',
  tags: ['z.stringbool', 'z.object', 'z.coerce.number'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
