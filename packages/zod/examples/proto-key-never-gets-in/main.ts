// JSON with a planted __proto__ key through z.object and z.strictObject
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const Account = z.object({ name: z.string() });
const StrictAccount = z.strictObject({ name: z.string() });

// JSON.parse makes "__proto__" an ordinary own key, which is how it reaches a schema.
const PLAIN = JSON.parse('{ "name": "ana" }') as unknown;
const PLANTED = JSON.parse('{ "name": "ana", "__proto__": { "isAdmin": true } }') as unknown;

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: the planted key never reaches the result.',
    inputs: [PLAIN, PLANTED],
    inTitle: 'Parsed JSON',
    outTitle: 'Result',
    noun: 'payloads',
    variants: [
      { label: 'z.object', code: 'z.object({ name: z.string() })', schema: Account, say: 'The __proto__ key is dropped like any other unknown key: the result holds only name' },
      { label: 'z.strictObject', code: 'z.strictObject({ name: z.string() })', schema: StrictAccount, say: 'A strict object names the __proto__ key as unrecognized instead of swallowing it' },
    ],
  });

export default mount;
