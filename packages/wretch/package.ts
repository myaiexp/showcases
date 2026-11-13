// Wretch: fluent, chainable wrapper around fetch with per-status helpers
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Wretch',
  npm: 'wretch',
  tagline: 'A tiny wrapper around fetch with a fluent, chainable API.',
  about:
    'Wretch reads like a sentence. You chain configuration (URL, headers, query, body), then chain outcome handlers: .json() for success, and named helpers like .notFound(), .unauthorized() or .internalError() for specific failure codes. Each one only fires for its status, so error handling stops being a pile of status checks. It is immutable and composable, so you can build a configured base client and branch off it.',
  category: 'Networking',
  homepage: 'https://github.com/elbywan/wretch',
  docsUrl: 'https://elbywan.github.io/wretch/',
  repo: 'https://github.com/elbywan/wretch',
  added: '2026-06-14',
  sections: ['Basics'],
});
