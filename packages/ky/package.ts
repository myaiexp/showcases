// ky: tiny Fetch-based HTTP client with JSON helpers, timeouts and retries
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'ky',
  npm: 'ky',
  tagline: 'A tiny, elegant HTTP client built on the Fetch API.',
  about:
    'A web page talks to servers by sending requests and reading the answers. The browser\'s built-in fetch does the sending, but leaves the chores to you: it does not complain when the server answers with an error, it does not try again when a server hiccups, and it will wait for ever. Ky wraps fetch with those chores done: error answers throw, failed requests retry with growing pauses, slow ones time out, JSON goes in and out in one line, and hooks let you step in before and after every request. Every example here talks to a pretend server inside the page, so you can watch each request travel and nothing goes to the network.',
  category: 'Networking',
  homepage: 'https://github.com/sindresorhus/ky',
  docsUrl: 'https://github.com/sindresorhus/ky#readme',
  repo: 'https://github.com/sindresorhus/ky',
  added: '2026-06-14',
  // The readme's order: Usage, then the API (requests, URL options, retry, timeouts, hooks,
  // errors, progress, JSON options, fetch and context, instances, ky.retry/ky.stop, error
  // classes), then Tips and the FAQ.
  sections: [
    'Usage',
    'Requests',
    'URLs',
    'Retry',
    'Timeouts and limits',
    'Hooks',
    'HTTP errors',
    'Progress',
    'JSON',
    'Fetch and context',
    'Instances',
    'Forced retries',
    'Error classes',
    'Tips',
    'FAQ',
  ],
});
