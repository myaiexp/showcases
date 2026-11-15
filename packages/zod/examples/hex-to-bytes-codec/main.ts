// hexToBytes: a codec between hex text and bytes, defined as the docs show
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const hexToBytes = z.codec(z.hex(), z.instanceof(Uint8Array), {
  decode: (hexString) => z.util.hexToUint8Array(hexString),
  encode: (bytes) => z.util.uint8ArrayToHex(bytes),
});

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'hexToBytes',
    codec: hexToBytes,
    samples: [
      { label: '"48656c6c6f"', value: '48656c6c6f' },
      { label: 'UPPER CASE', value: '48656C6C6F', say: '✓ upper case reads fine, but encode always writes lower case' },
      { label: '"xyz"', value: 'xyz', say: '✗ not hexadecimal: z.hex() refuses it' },
      { label: '"abc" (odd length)', value: 'abc', say: '✗ z.hex() allowed it, then the converter threw: half a byte is not a byte' },
      { label: 'encode bytes', value: new Uint8Array([1, 171, 255]), dir: 'encode' },
    ],
  });

export default mount;
