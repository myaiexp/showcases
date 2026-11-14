// ky example: .json(schema) validates the parsed data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check the data with a schema',
  summary:
    'A server can answer 200 OK and still send data your page cannot use, such as an age written as text. Hand .json() a schema (zod here, any Standard Schema works) and Ky checks the parsed data before returning it. Bad data throws a SchemaValidationError that lists what was wrong, instead of failing later somewhere far away.',
  section: 'JSON',
  tags: ['.json(schema)', 'SchemaValidationError', 'zod', 'Standard Schema'],
  docs: ['repo/readme.md', 'repo/source/errors/SchemaValidationError.ts', 'repo/source/types/standard-schema.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
