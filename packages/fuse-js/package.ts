// Fuse.js: lightweight zero-dependency fuzzy search for the client
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Fuse.js',
  npm: 'fuse.js',
  tagline: 'Lightweight fuzzy-search library with zero dependencies, for client-side search without a server.',
  about:
    'People mistype. Search "javscript" with a plain text filter and you get nothing; Fuse.js finds "JavaScript" anyway, ranks the closest matches first and tells you which letters matched. It runs in the browser over a list you already have (contacts, products, commands, files), with no server or search service. Weighted fields, multi-word token search, unix-like operators, and/or queries and Web Worker search cover the rest.',
  category: 'Utilities',
  homepage: 'https://www.fusejs.io',
  docsUrl: 'https://www.fusejs.io/getting-started.html',
  repo: 'https://github.com/krisk/Fuse',
  added: '2026-03-03',
  // The docs sidebar order (docs/.vitepress/config.ts), with two sections for what the
  // README's feature list and the type definitions document but no docs page covers:
  // keys and result options after Getting Started, collections and indexes after Logical Search.
  sections: [
    'Getting Started',
    'Keys and results',
    'Fuzzy Search',
    'Token Search',
    'Extended Search',
    'Logical Search',
    'Collections and indexes',
    'Web Workers',
    'Performance',
    'Articles',
  ],
});
