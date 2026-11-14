// z.url() with a hostname or protocol pattern: which sites, which scheme
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = ['https://example.com', 'http://example.com', 'https://www.example.com', 'https://zombo.com', 'ftp://example.com'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'any URL', code: 'z.url()', schema: z.url() },
      { label: 'only example.com', code: 'z.url({ hostname: /^example\\.com$/ })', schema: z.url({ hostname: /^example\.com$/ }) },
      { label: 'only https', code: 'z.url({ protocol: /^https$/ })', schema: z.url({ protocol: /^https$/ }) },
      {
        label: 'both',
        code: 'z.url({ hostname: /^example\\.com$/, protocol: /^https$/ })',
        schema: z.url({ hostname: /^example\.com$/, protocol: /^https$/ }),
      },
    ],
  });

export default mount;
