// stringToNumber and stringToInt codecs, as the docs define them
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const stringToNumber = z.codec(z.string().regex(z.regexes.number), z.number(), {
  decode: (str) => Number.parseFloat(str),
  encode: (num) => num.toString(),
});
const stringToInt = z.codec(z.string().regex(z.regexes.integer), z.int(), {
  decode: (str) => Number.parseInt(str, 10),
  encode: (num) => num.toString(),
});

const NUM = 'stringToNumber';
const INT = 'stringToInt';

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: NUM,
    codec: stringToNumber,
    samples: [
      { label: 'number "42.50"', value: '42.50', code: NUM },
      { label: 'number "abc"', value: 'abc', code: NUM },
      { label: 'number "1e3"', value: '1e3', code: NUM, say: '✗ the pattern allows plain digits only, so "1e3" is refused before parseFloat' },
      { label: 'number: encode 1e-7', value: 1e-7, dir: 'encode', code: NUM, say: '✗ 1e-7 writes as "1e-7", which the codec\'s own pattern refuses' },
      { label: 'int "42"', value: '42', codec: stringToInt, code: INT },
      { label: 'int "4.5"', value: '4.5', codec: stringToInt, code: INT },
      { label: 'int "99999999999999999999"', value: '99999999999999999999', codec: stringToInt, code: INT, say: '✗ the text is a fine integer, but the result is beyond the safe range z.int() allows' },
    ],
  });

export default mount;
