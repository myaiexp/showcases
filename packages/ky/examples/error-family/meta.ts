// ky example: Ky's error classes and isKyError
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The family of Ky errors',
  summary:
    'Requests fail in different ways: a bad answer, no answer in time, no connection, a file too big, a retry that was asked for. Ky gives each its own error class, and isKyError() recognises all of them in one line. The one outsider is SchemaValidationError, because it means your data was wrong, not the request.',
  section: 'Error classes',
  tags: ['isKyError', 'KyError', 'HTTPError', 'TimeoutError', 'NetworkError', 'ResponseSizeError', 'ForceRetryError', 'SchemaValidationError'],
  docs: ['repo/readme.md', 'repo/source/errors/KyError.ts', 'repo/source/errors/SchemaValidationError.ts', 'repo/source/errors/ForceRetryError.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
