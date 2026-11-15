// z.coerce.date() runs new Date(input): text and timestamps become real dates
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const strict = z.date();
// new Date(input): ISO text and millisecond timestamps convert, unreadable text does not.
const coerced = z.coerce.date();

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    types: true,
    inputs: ['2024-03-09', '2024-03-09T10:30:00Z', 1700000000000, 'next tuesday', '', null, undefined],
    variants: [
      { label: 'z.date()', code: 'z.date()  // must already be a Date', schema: strict },
      {
        label: 'z.coerce.date()',
        code: 'z.coerce.date()  // new Date(input)',
        schema: coerced,
        say: (n, m) => `${n} of ${m} pass: null slipped through as 1 Jan 1970, so check for missing values first`,
      },
    ],
  });

export default mount;
