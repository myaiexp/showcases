// Zod example: Required or wrong type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Required or wrong type',
  summary:
    'A field left out and a field with the wrong kind of value both fail as invalid type. An error function can tell them apart by checking whether iss.input is undefined, so the message says "required" for one and "invalid" for the other.',
  section: 'Customizing errors',
  tags: ['error function', 'iss.input', 'undefined', 'z.number'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
