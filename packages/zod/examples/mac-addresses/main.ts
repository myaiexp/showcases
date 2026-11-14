// z.mac() with colons or with a dash delimiter, on the same hardware addresses
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = ['00:1A:2B:3C:4D:5E', '00-1A-2B-3C-4D-5E', '00:1a:2b:3c:4d:5e', '00:1A:2b:3C:4d:5E', '001A:2B3C:4D5E', '00:1A:2B:3C:4D'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'colons', code: 'z.mac()', schema: z.mac() },
      { label: 'dashes', code: 'z.mac({ delimiter: "-" })', schema: z.mac({ delimiter: '-' }) },
    ],
  });

export default mount;
