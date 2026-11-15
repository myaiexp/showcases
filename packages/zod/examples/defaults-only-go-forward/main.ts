// .default() and .prefault() fill gaps on decode only
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const withDefault = z.string().default('hello');
const withPrefault = z.string().prefault('hello');

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'z.string().default("hello")',
    codec: withDefault,
    samples: [
      { label: 'decode: missing', value: undefined, say: '✓ missing became "hello" on the way in, and "hello" encodes back fine' },
      { label: 'encode: missing', value: undefined, dir: 'encode', say: '✗ encode gets no default: the output is a string, so undefined is refused' },
      { label: 'prefault, decode: missing', value: undefined, codec: withPrefault, code: 'z.string().prefault("hello")', say: '✓ prefault also fills the gap on the way in' },
      { label: 'prefault, encode: missing', value: undefined, dir: 'encode', codec: withPrefault, code: 'z.string().prefault("hello")', say: '✗ prefault is forward-only as well' },
    ],
  });

export default mount;
