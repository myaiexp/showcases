// stringToURL and stringToHttpURL codecs, defined as the docs show
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const stringToURL = z.codec(z.url(), z.instanceof(URL), {
  decode: (urlString) => new URL(urlString),
  encode: (url) => url.href,
});
const stringToHttpURL = z.codec(z.httpUrl(), z.instanceof(URL), {
  decode: (urlString) => new URL(urlString),
  encode: (url) => url.href,
});

const ANY = 'stringToURL';
const HTTP = 'stringToHttpURL';

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: ANY,
    codec: stringToURL,
    samples: [
      { label: 'https link', value: 'https://example.com/path', code: ANY },
      { label: 'bare host', value: 'https://example.com', code: ANY, say: '✓ round trip works, but href added the trailing slash' },
      { label: 'ftp link, any URL', value: 'ftp://files.example.com/a.txt', code: ANY },
      { label: 'ftp link, http only', value: 'ftp://files.example.com/a.txt', codec: stringToHttpURL, code: HTTP },
      { label: 'not a link', value: 'not a url', code: ANY },
      { label: 'encode a text', value: 'https://example.com', dir: 'encode', code: ANY, say: '✗ encode wants a URL object: text is refused' },
    ],
  });

export default mount;
