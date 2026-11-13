// ky: tiny Fetch-based HTTP client with JSON helpers, timeouts and retries
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'ky',
  npm: 'ky',
  tagline: 'A tiny, elegant HTTP client built on the Fetch API.',
  about:
    "fetch is built into every browser, but it is verbose: you check response.ok yourself, call .json() manually, and there is no retry or timeout. ky wraps fetch with sensible defaults. Non-2xx responses throw, .json() is a one-liner, requests retry on transient failures with exponential backoff, and hooks let you tap into the request lifecycle. Same platform primitive, far less boilerplate.",
  category: 'Networking',
  homepage: 'https://github.com/sindresorhus/ky',
  docsUrl: 'https://github.com/sindresorhus/ky#readme',
  repo: 'https://github.com/sindresorhus/ky',
  added: '2026-06-14',
  sections: ['Basics'],
});
