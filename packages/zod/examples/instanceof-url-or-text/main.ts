// z.instanceof(URL), (Date), (Error) over objects and look-alikes
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const INPUTS: unknown[] = [new URL('https://example.com/menu'), 'https://example.com/menu', new Date('2026-11-14'), 'not-a-date', new TypeError('boom'), { message: 'boom' }];

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    inputs: INPUTS,
    variants: [
      { label: 'URL', code: 'z.instanceof(URL)', schema: z.instanceof(URL), say: (p) => `${p} passes: only the real URL object, returned as the same object` },
      { label: 'Date', code: 'z.instanceof(Date)', schema: z.instanceof(Date), say: (p) => `${p} passes: the date text is just text` },
      { label: 'Error', code: 'z.instanceof(Error)', schema: z.instanceof(Error), say: (p) => `${p} passes: subclasses like TypeError count, a look-alike object does not` },
    ],
    hint: 'Same six values, three classes.',
  });

export default mount;
