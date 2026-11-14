// z.url() against z.httpUrl() on links a web form should and should not accept
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = ['https://example.com/docs?page=2', 'http://localhost:3000', 'http://192.168.0.1', 'ftp://files.example.com', 'mailto:noreply@zod.dev', 'javascript:alert(1)'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'z.url()', code: 'z.url()  // any scheme', schema: z.url() },
      {
        label: 'z.httpUrl()',
        code: 'z.httpUrl()  // http(s) and a real domain',
        schema: z.httpUrl(),
        say: (n, m) => `${n} of ${m} pass: only a real web address with a domain name gets in`,
      },
    ],
  });

export default mount;
