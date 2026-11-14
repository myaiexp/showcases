// A .refine() on a codec runs on decode and on encode
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const stringToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});
const thisMillennium = stringToDate.refine((date) => date.getFullYear() >= 2000, 'Must be this millennium');

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'stringToDate.refine(year >= 2000)',
    codec: thisMillennium,
    hint: 'Samples start from text (decode) or from a Date (encode); the check applies either way.',
    samples: [
      { label: 'decode 2024 text', value: '2024-01-15T10:30:00.000Z' },
      { label: 'decode 1999 text', value: '1999-06-01T00:00:00.000Z', say: '✗ decode ran the check on the new Date: Must be this millennium' },
      { label: 'encode a 2000 Date', value: new Date('2000-01-01T00:00:00.000Z'), dir: 'encode' },
      { label: 'encode a 1999 Date', value: new Date('1999-01-01T00:00:00.000Z'), dir: 'encode', say: '✗ encode ran the same check: Must be this millennium' },
      { label: 'encode text instead', value: '2024-01-15T10:30:00.000Z', dir: 'encode', say: '✗ the type pass came first: text is not a Date, so the check never ran' },
    ],
  });

export default mount;
