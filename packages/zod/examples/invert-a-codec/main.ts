// z.invertCodec: a codec and its reverse, each round-tripped
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const stringToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});
// The reverse: it now takes a Date in (decode) and gives the text back (encode).
const dateToString = z.invertCodec(stringToDate);

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'stringToDate: text decodes to a Date',
    codec: stringToDate,
    samples: [
      { label: 'stringToDate: text', value: '2024-01-15T10:30:00.000Z', code: 'stringToDate.decode(text)' },
      { label: 'dateToString: a Date', value: new Date('2024-01-15T10:30:00.000Z'), codec: dateToString, code: 'z.invertCodec(stringToDate).decode(date)' },
      { label: 'dateToString: text', value: '2024-01-15T10:30:00.000Z', codec: dateToString, code: 'z.invertCodec(stringToDate).decode(text)' },
      { label: 'stringToDate: "soon"', value: 'soon', code: 'stringToDate.decode(text)' },
    ],
  });

export default mount;
