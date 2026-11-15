// base64ToBytes and base64urlToBytes codecs, defined as the docs show
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const base64ToBytes = z.codec(z.base64(), z.instanceof(Uint8Array), {
  decode: (base64String) => z.util.base64ToUint8Array(base64String),
  encode: (bytes) => z.util.uint8ArrayToBase64(bytes),
});
const base64urlToBytes = z.codec(z.base64url(), z.instanceof(Uint8Array), {
  decode: (base64urlString) => z.util.base64urlToUint8Array(base64urlString),
  encode: (bytes) => z.util.uint8ArrayToBase64url(bytes),
});

const B64 = 'base64ToBytes';
const URL64 = 'base64urlToBytes';
const odd = new Uint8Array([251, 255, 254]);

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: B64,
    codec: base64ToBytes,
    samples: [
      { label: 'base64 "SGVsbG8="', value: 'SGVsbG8=', code: B64 },
      { label: 'base64 no padding', value: 'SGVsbG8', code: B64, say: '✗ plain base64 must be padded with =' },
      { label: 'base64 with - and _', value: '-_-_', code: B64, say: '✗ - and _ belong to base64url, not base64' },
      { label: 'url "SGVsbG8"', value: 'SGVsbG8', codec: base64urlToBytes, code: URL64 },
      { label: 'url with padding', value: 'SGVsbG8=', codec: base64urlToBytes, code: URL64, say: '✗ base64url has no = padding' },
      { label: 'encode as base64', value: odd, dir: 'encode', code: B64, say: '✓ the same three bytes are written as +//+ here' },
      { label: 'encode as base64url', value: odd, dir: 'encode', codec: base64urlToBytes, code: URL64, say: '✓ and as -__- here: the characters safe to put in a URL' },
    ],
  });

export default mount;
