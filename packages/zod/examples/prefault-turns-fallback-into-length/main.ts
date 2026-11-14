// A default is an output (a number); a prefault is an input (text that gets measured)
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const measure = z.string().transform((text) => text.length);
const AsDefault = measure.default(0);
const AsPrefault = measure.prefault('tuna');

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch between default and prefault.',
    inputs: [undefined, 'salmon', ''],
    inTitle: 'Text',
    outTitle: 'Length',
    types: true,
    noun: 'texts',
    variants: [
      { label: '.default(0)', code: 'z.string().transform(text => text.length).default(0)', schema: AsDefault, say: 'A default is already the answer: a missing text is 0' },
      { label: '.prefault("tuna")', code: "z.string().transform(text => text.length).prefault('tuna')", schema: AsPrefault, say: 'A prefault is fed in as the text: "tuna" is measured and a missing text is 4' },
    ],
  });

export default mount;
