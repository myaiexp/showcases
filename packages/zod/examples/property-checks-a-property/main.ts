// z.property(): a schema applied to one property, here length and protocol
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const longText = z.string().check(z.property('length', z.number().min(10)));
const nonEmptyList = z.array(z.string()).check(z.property('length', z.number().min(2)));
const httpsOnly = z.instanceof(URL).check(z.property('protocol', z.literal('https:', 'Only HTTPS allowed')));

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    variants: [
      { label: 'text length', code: "z.string().check(z.property('length', z.number().min(10)))", schema: longText, inputs: ['hello there!', 'hello.', 42], say: () => 'The issue is pinned to the length property' },
      { label: 'list length', code: "z.array(z.string()).check(z.property('length', z.number().min(2)))", schema: nonEmptyList, inputs: [['a', 'b', 'c'], ['a'], []], say: () => 'The list itself is valid; its length is what fails' },
      {
        label: 'URL protocol',
        code: "z.instanceof(URL).check(z.property('protocol', z.literal('https:')))",
        schema: httpsOnly,
        inputs: [new URL('https://example.com'), new URL('http://example.com'), 'https://example.com'],
        say: () => 'Only the https URL passes; the text is not a URL object at all',
      },
    ],
    hint: 'Three values, three properties.',
  });

export default mount;
