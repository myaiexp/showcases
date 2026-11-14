// Wretch: fluent, chainable wrapper around fetch with per-status helpers
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Wretch',
  npm: 'wretch',
  tagline: 'A tiny wrapper around fetch with a fluent, chainable API.',
  about:
    'Every web app talks to servers, and the browser\'s built-in fetch leaves a lot to you: turning answers into data, noticing that "404 Not Found" is a failure, setting headers, retrying when the connection drops. Wretch wraps fetch in one readable chain. You describe the request (address, headers, query, body), then say what to do with each outcome: .json() for success, .notFound() or .unauthorized() for specific failures. Addons add query strings, forms, timeouts and progress bars; middlewares add retries, de-duplication and caching. Every example here talks to a simulated server inside the page, so you can watch each request travel and see what came back.',
  category: 'Networking',
  homepage: 'https://github.com/elbywan/wretch',
  docsUrl: 'https://elbywan.github.io/wretch/',
  repo: 'https://github.com/elbywan/wretch',
  added: '2026-06-14',
  // The README's chapter order (the API chapter split by its headings), then the Recipes guide
  // README links from its Recipes chapter, and the v2 → v3 migration guide.
  sections: [
    'Quick start',
    'Motivation',
    'Usage',
    'Recipes',
    'Helper methods',
    'Body types',
    'HTTP methods',
    'Catchers',
    'Response types',
    'Addons',
    'Middlewares',
    'Writing a middleware',
    'Limitations',
    'Migrating from v2',
  ],
});
