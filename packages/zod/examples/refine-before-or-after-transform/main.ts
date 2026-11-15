// The same refine and transform chained in two orders, over padded and plain codes
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const short = (v: string): boolean => v.length <= 5;

const refineFirst = z
  .string()
  .refine(short, { error: 'More than 5 characters' })
  .transform((v) => v.trim());

const transformFirst = z
  .string()
  .transform((v) => v.trim())
  .refine(short, { error: 'More than 5 characters' });

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch the order: padded codes are the ones that change sides.',
    inputs: ['  hello  ', 'hello world', 'hey', '  hey  '],
    noun: 'codes',
    outTitle: 'Came out',
    variants: [
      { label: 'refine, then transform', code: 'z.string().refine(≤ 5).transform(trim)', schema: refineFirst, say: 'The refine sees the text as typed, spaces included.' },
      { label: 'transform, then refine', code: 'z.string().transform(trim).refine(≤ 5)', schema: transformFirst, say: 'The refine sees the trimmed text: the padding no longer counts.' },
    ],
  });

export default mount;
