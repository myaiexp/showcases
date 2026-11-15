// One refine rule with no message, a fixed message, and a message that quotes the input
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const longEnough = (val: string): boolean => val.length > 8;

const plain = z.string().refine(longEnough);
const fixed = z.string().refine(longEnough, { error: 'Too short!' });
// The error option also takes a function that receives the issue, input included.
const quoting = z.string().refine(longEnough, { error: (iss) => `Too short: "${String(iss.input)}"` });

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Pick a version: the rule is the same, only the wording of the failure changes.',
    inputs: ['OH NO', 'ada', 'ada_lovelace', ''],
    cardInputs: ['OH NO', 'ada', 'ada_lovelace'],
    noun: 'usernames',
    types: false,
    variants: [
      { label: 'No message', code: 'z.string().refine((v) => v.length > 8)', schema: plain, say: 'Without an error option the failure only says "Invalid input".' },
      { label: 'Fixed message', code: 'refine(fn, { error: "Too short!" })', schema: fixed, say: 'A string in the error option replaces the default wording.' },
      { label: 'Message from a function', code: 'refine(fn, { error: (iss) => `Too short: "${iss.input}"` })', schema: quoting, say: 'A function gets the issue, so the message can quote what was typed.' },
    ],
  });

export default mount;
