// utf8ToBytes and bytesToUtf8 codecs, defined as the docs show
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const utf8ToBytes = z.codec(z.string(), z.instanceof(Uint8Array), {
  decode: (str) => new TextEncoder().encode(str),
  encode: (bytes) => new TextDecoder().decode(bytes),
});
const bytesToUtf8 = z.codec(z.instanceof(Uint8Array), z.string(), {
  decode: (bytes) => new TextDecoder().decode(bytes),
  encode: (str) => new TextEncoder().encode(str),
});

const A = 'utf8ToBytes';
const B = 'bytesToUtf8';

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: A,
    codec: utf8ToBytes,
    samples: [
      { label: 'text "Hi"', value: 'Hi', code: A },
      { label: 'text "café"', value: 'café', code: A, say: '✓ the é takes two bytes (195 169), so four letters make five bytes' },
      { label: 'text "世界"', value: '世界', code: A, say: '✓ each of these characters takes three bytes' },
      { label: 'bytes to text', value: new Uint8Array([72, 105, 33]), codec: bytesToUtf8, code: B },
      { label: 'bad bytes', value: new Uint8Array([255, 254]), codec: bytesToUtf8, code: B, say: '✓ no error: invalid UTF-8 became replacement characters, so the bytes cannot come back' },
      { label: 'text, wrong side', value: 'Hi', codec: bytesToUtf8, code: B, say: '✗ bytesToUtf8 wants bytes in, and text is not bytes' },
    ],
  });

export default mount;
