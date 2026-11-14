// uriComponent: a string-to-string codec over encodeURIComponent
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const uriComponent = z.codec(z.string(), z.string(), {
  decode: (encodedString) => decodeURIComponent(encodedString),
  encode: (decodedString) => encodeURIComponent(decodedString),
});

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'uriComponent',
    codec: uriComponent,
    samples: [
      { label: '"Hello%20World%21"', value: 'Hello%20World%21', say: '✓ decoded, but encode leaves the ! as it is, so it comes back spelled differently' },
      { label: '"a%2Fb"', value: 'a%2Fb' },
      { label: 'encode "café & crème"', value: 'café & crème', dir: 'encode' },
      { label: '"100%"', value: '100%', say: '✗ a lone % is not an escape: decodeURIComponent threw a URIError' },
    ],
  });

export default mount;
