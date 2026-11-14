// The same timestamps through z.iso.datetime() and each of its options
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = [
  '2020-01-01T06:15:00Z',
  '2020-01-01T06:15:00.123Z',
  '2020-01-01T06:15:00+02:00',
  '2020-01-01T06:15:00',
  '2020-01-01T06:15Z',
  '2020-02-30T10:00:00Z',
];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'default', code: 'z.iso.datetime()  // UTC "Z" only', schema: z.iso.datetime() },
      { label: 'offset', code: 'z.iso.datetime({ offset: true })', schema: z.iso.datetime({ offset: true }) },
      { label: 'local', code: 'z.iso.datetime({ local: true })', schema: z.iso.datetime({ local: true }) },
      { label: 'minutes only', code: 'z.iso.datetime({ precision: -1 })', schema: z.iso.datetime({ precision: -1 }) },
      { label: 'whole seconds', code: 'z.iso.datetime({ precision: 0 })', schema: z.iso.datetime({ precision: 0 }) },
      { label: 'milliseconds', code: 'z.iso.datetime({ precision: 3 })', schema: z.iso.datetime({ precision: 3 }) },
    ],
  });

export default mount;
