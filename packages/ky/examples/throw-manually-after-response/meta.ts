// ky example: throw HTTPError by hand from afterResponse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Throw for server errors by hand',
  summary:
    'When error answers are not thrown, you can still read their body like a normal answer, and throw yourself for the ones that are real emergencies. Turn throwHttpErrors off and add an afterResponse hook that throws an HTTPError for 5xx answers only: a 404 explanation stays readable, a 503 lands in catch.',
  section: 'FAQ',
  tags: ['throwHttpErrors', 'afterResponse', 'HTTPError', '5xx', 'hooks'],
  docs: ['repo/readme.md', 'repo/source/errors/HTTPError.ts', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
