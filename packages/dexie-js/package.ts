// Dexie.js: minimalistic promise-based IndexedDB wrapper
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Dexie.js',
  npm: 'dexie',
  tagline: 'A minimalistic IndexedDB wrapper that makes browser storage effortless.',
  about:
    'IndexedDB is powerful but its raw API is callback-heavy and awkward. Dexie wraps it in a clean, promise-based interface that feels like a real database, with schema versioning, compound indexes and transactions built in. It fits when localStorage is not enough and you need structured, queryable client-side storage.',
  category: 'State/Data',
  homepage: 'https://dexie.org',
  docsUrl: 'https://dexie.org/docs/',
  repo: 'https://github.com/dexie/Dexie.js',
  added: '2026-03-03',
  sections: ['Basics'],
});
