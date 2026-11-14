// z.email() on raw text vs z.preprocess(tidy, z.email()): the same inputs, tidied first
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const asTyped = z.email();
// The preprocessor sees anything, so it only touches strings.
const tidied = z.preprocess((val) => (typeof val === 'string' ? val.trim().toLowerCase() : val), z.email());

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch the schema: the same typed addresses, tidied first or not.',
    inputs: ['  Ada@Example.COM ', 'ADA@EXAMPLE.COM', 'ada@example.com', 'ada @example.com', 42],
    cardInputs: ['  Ada@Example.COM ', 'ADA@EXAMPLE.COM', 'ada@example.com', 'ada @example.com', 42],
    noun: 'addresses',
    outTitle: 'Came out',
    variants: [
      { label: 'z.email()', code: 'z.email()', schema: asTyped },
      { label: 'z.preprocess(tidy, z.email())', code: 'z.preprocess(v => v.trim().toLowerCase(), z.email())', schema: tidied },
    ],
  });

export default mount;
