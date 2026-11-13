// Fuse.js: lightweight zero-dependency fuzzy search for the client
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Fuse.js',
  npm: 'fuse.js',
  tagline: 'Lightweight fuzzy-search library with zero dependencies, for client-side search without a server.',
  about:
    'Fuse.js brings powerful fuzzy searching to the client with no backend. It handles typos, partial matches and weighted multi-key search. It is the go-to when you need "search that just works" for small-to-medium datasets without setting up Elasticsearch or Algolia.',
  category: 'Utilities',
  homepage: 'https://www.fusejs.io',
  docsUrl: 'https://www.fusejs.io/getting-started/installation.html',
  repo: 'https://github.com/krisk/Fuse',
  added: '2026-03-03',
  sections: ['Basics'],
});
