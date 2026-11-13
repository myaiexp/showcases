// Papa Parse: fast, full-featured CSV parser for the browser
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Papa Parse',
  npm: 'papaparse',
  tagline: 'The fast, full-featured CSV parser for the browser, with headers, typing and edge-case handling.',
  about:
    'Parsing CSV by hand works right up until a value contains a comma, a quote or a newline, then it falls apart. Papa Parse is RFC-4180 compliant and battle-tested: it handles quoted fields with embedded delimiters, auto-detects the delimiter, converts types, skips blank lines, and can even stream gigabyte files or parse in a Web Worker. For any "let the user upload a spreadsheet" feature, it is the dependable default.',
  category: 'Parsing',
  homepage: 'https://www.papaparse.com',
  docsUrl: 'https://www.papaparse.com/docs',
  repo: 'https://github.com/mholt/PapaParse',
  added: '2026-06-14',
  sections: ['Basics'],
});
