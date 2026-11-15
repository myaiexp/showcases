// .transform() is one-way: encode throws; a z.codec round-trips
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const viaTransform = z.string().transform((text) => Number(text));
const viaCodec = z.codec(z.string(), z.number(), { decode: (text) => Number(text), encode: (n) => String(n) });

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'z.string().transform(Number)',
    codec: viaTransform,
    samples: [
      { label: 'transform: "42"', value: '42', say: '✗ "42" decoded to 42, but encoding it back threw: a transform has no way back' },
      { label: 'codec: "42"', value: '42', codec: viaCodec, code: 'z.codec(z.string(), z.number(), { decode, encode })', say: '✓ the codec has an encode function, so 42 goes back to "42"' },
      { label: 'codec: encode 7', value: 7, dir: 'encode', codec: viaCodec, code: 'z.codec(z.string(), z.number(), { decode, encode })' },
    ],
  });

export default mount;
