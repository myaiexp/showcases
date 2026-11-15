// .catch() swallows a bad value on decode only; encode reports it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { tripDemo } from '../../shared/codec-trip.ts';

const nickname = z.string().catch('guest');

const mount: Mount = (el, ctx) =>
  tripDemo(el, ctx, {
    code: 'z.string().catch("guest")',
    codec: nickname,
    samples: [
      { label: 'decode: a number', value: 1234, say: '✓ 1234 is not text, so catch gave "guest" instead of an error' },
      { label: 'encode: a number', value: 1234, dir: 'encode', say: '✗ encode has no catch: 1234 is refused' },
      { label: 'decode: real text', value: 'mina' },
    ],
  });

export default mount;
