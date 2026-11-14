// One list of ids through z.uuid(), a pinned version, and the looser z.guid()
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = [
  '550e8400-e29b-41d4-a716-446655440000',
  '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  '018f3a2e-7c4b-7a2c-9d3e-5b6a7c8d9e0f',
  '550e8400-e29b-41d4-c716-446655440000',
  '550e8400e29b41d4a716446655440000',
  'order-1234',
];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'any UUID', code: 'z.uuid()', schema: z.uuid() },
      { label: 'version 4', code: 'z.uuid({ version: "v4" })  // or z.uuidv4()', schema: z.uuid({ version: 'v4' }) },
      { label: 'version 7', code: 'z.uuidv7()  // time-ordered ids', schema: z.uuidv7() },
      { label: 'guid', code: 'z.guid()  // any UUID-shaped text', schema: z.guid() },
    ],
  });

export default mount;
