// Dexie.js: minimalistic promise-based IndexedDB wrapper
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Dexie.js',
  npm: 'dexie',
  tagline: 'A minimalistic IndexedDB wrapper that makes browser storage effortless.',
  about:
    'Every browser has a real database built in, IndexedDB, but its raw API is awkward. Dexie wraps it so a web app can keep thousands of records on the visitor\'s own device, find them by any indexed field, change many at once inside a transaction, and redraw itself whenever the data changes (liveQuery). It suits offline-first apps, caches, drafts and anything localStorage is too small or too flat for. Each card here runs a real database in your browser: the grid is what is stored, green rows were just added, amber cells just changed, red rows are being deleted, and highlighted rows are what a query matched.',
  category: 'State/Data',
  homepage: 'https://dexie.org',
  docsUrl: 'https://dexie.org/docs/',
  repo: 'https://github.com/dexie/Dexie.js',
  added: '2026-03-03',
  sections: [
    'Getting started',
    'Schema and versions',
    'Table',
    'WhereClause',
    'Collection',
    'Prop modifications',
    'Transaction',
    'liveQuery',
    'Dexie class',
    'Hooks and middleware',
    'Errors',
    'Promise',
    'TypeScript',
    'Knowledge base',
  ],
});
