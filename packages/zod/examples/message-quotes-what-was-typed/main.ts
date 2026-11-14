// A message that repeats the rejected text and lists the allowed choices from the issue
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

// On an invalid_value issue, iss.values lists the allowed options and iss.input what came in.
const Size = z.enum(['S', 'M', 'L', 'XL'], {
  error: (iss) => (iss.code === 'invalid_value' ? `"${String(iss.input)}" is not a size we sell: ${iss.values.join(', ')}` : undefined),
});

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.enum(["S","M","L","XL"], { error: (iss) => … })',
    schema: Size,
    label: 'T-shirt size',
    placeholder: 'S, M, L or XL',
    hint: 'Type a size: the message quotes your text back and lists the options.',
    samples: ['XXL', 'medium', 'm', 'XL'],
    typed: ['XXL', 'm', 'XL'],
    okText: 'a size we sell',
  });

export default mount;
