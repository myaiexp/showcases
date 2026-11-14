// Papa Parse example: arrays and objects inside a cell, raw versus flattened
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arrays and objects inside a cell',
  summary:
    'A CSV cell holds one flat value. Hand Papa.unparse an array and its items run together; hand it an object and you get "[object Object]". Turn them into JSON text first and they survive.',
  section: 'Convert JSON to CSV',
  tags: ['Papa.unparse', 'nested', 'JSON.stringify'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
