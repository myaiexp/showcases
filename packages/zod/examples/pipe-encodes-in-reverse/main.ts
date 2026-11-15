// A codec piped into a number cap: decode runs A then B, encode runs B then A
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const stringToInt = z.codec(z.string().regex(z.regexes.integer), z.int(), {
  decode: (text) => Number.parseInt(text, 10),
  encode: (n) => n.toString(),
});
const quantity = stringToInt.pipe(z.number().max(100));

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'stringToInt.pipe(z.number().max(100))',
    codec: quantity,
    samples: [
      { label: 'decode "50"', value: '50' },
      { label: 'decode "150"', value: '150', say: '✗ A read "150" as 150, then B refused it: too big' },
      { label: 'encode 50', value: 50, dir: 'encode' },
      { label: 'encode 150', value: 150, dir: 'encode', say: '✗ going back, B (the cap) looked at 150 first and refused it' },
      { label: 'encode 4.5', value: 4.5, dir: 'encode', say: '✗ B passes 4.5, then A (the integer side) refuses it: this is the reverse order' },
    ],
  });

export default mount;
