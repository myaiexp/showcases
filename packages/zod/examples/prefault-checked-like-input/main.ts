// A prefault is checked by the schema's rules; a default is not
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const Default = z.string().min(5).default('ab');
const Prefault = z.string().min(5).prefault('ab');
const Fixed = z.string().min(5).prefault('welcome');

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: the prefault is held to the 5-character rule.',
    inputs: [undefined, 'captain', 'ab'],
    inTitle: 'Nickname',
    outTitle: 'Result',
    noun: 'nicknames',
    variants: [
      { label: '.default("ab")', code: "z.string().min(5).default('ab')", schema: Default, say: 'The default "ab" is handed back without a check' },
      { label: '.prefault("ab")', code: "z.string().min(5).prefault('ab')", schema: Prefault, say: 'The prefault "ab" is parsed like input, and fails the 5-character rule' },
      { label: '.prefault("welcome")', code: "z.string().min(5).prefault('welcome')", schema: Fixed, say: 'A prefault that satisfies the rules passes through the schema and comes out as "welcome"' },
    ],
  });

export default mount;
