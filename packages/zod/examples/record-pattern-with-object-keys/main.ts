// z.object({ name }) and z.record(/^S_/, text): the record leaves "name" alone
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// A name, plus any number of free-form settings whose keys start with S_.
const Device = z.object({ name: z.string() }).and(z.record(z.string().regex(/^S_/), z.string()));

const INPUTS = [{ name: 'lamp' }, { name: 'lamp', S_room: 'hall', S_color: 'warm' }, { name: 'lamp', S_room: 5 }];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Edit nothing: the three inputs show where the record applies.',
    inputs: INPUTS,
    inTitle: 'Device',
    outTitle: 'Result',
    noun: 'devices',
    variants: [
      { label: 'object & record', code: 'object({ name }).and(record(regex(/^S_/), string()))', schema: Device, say: 'name matches no S_ pattern, so only the S_ keys are checked as text' },
    ],
  });

export default mount;
