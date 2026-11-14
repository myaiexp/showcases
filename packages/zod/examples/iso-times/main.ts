// z.iso.time() and its precision option over the same clock times
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = ['03:15', '03:15:00', '03:15:00.5', '03:15:00.123', '03:15:00Z', '24:00'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'default', code: 'z.iso.time()  // seconds optional', schema: z.iso.time() },
      { label: 'minutes', code: 'z.iso.time({ precision: -1 })  // HH:MM', schema: z.iso.time({ precision: -1 }) },
      { label: 'seconds', code: 'z.iso.time({ precision: 0 })  // HH:MM:SS', schema: z.iso.time({ precision: 0 }) },
      { label: 'tenths', code: 'z.iso.time({ precision: 1 })  // HH:MM:SS.s', schema: z.iso.time({ precision: 1 }) },
      { label: 'milliseconds', code: 'z.iso.time({ precision: 3 })  // HH:MM:SS.sss', schema: z.iso.time({ precision: 3 }) },
    ],
  });

export default mount;
