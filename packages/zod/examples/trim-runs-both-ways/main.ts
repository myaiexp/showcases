// z.string().trim() and .toLowerCase() still run when encoding
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const tidyName = z.string().trim();
const tidyEmail = z.string().trim().toLowerCase();

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'z.string().trim()',
    codec: tidyName,
    samples: [
      { label: 'decode "  hello  "', value: '  hello  ', say: '✓ decode trimmed the spaces' },
      { label: 'encode "  hello  "', value: '  hello  ', dir: 'encode', say: '✓ encode trimmed them too: no one-way restriction here' },
      { label: 'email, encode', value: '  Mina@Example.COM ', dir: 'encode', codec: tidyEmail, code: 'z.string().trim().toLowerCase()', say: '✓ trim and lowercase both ran going out' },
    ],
  });

export default mount;
