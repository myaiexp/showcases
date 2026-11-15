// The same addresses through z.ipv4() and z.ipv6()
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = ['192.168.0.1', '256.1.1.1', '192.168.0', '2001:db8:85a3::8a2e:370:7334', '::1', '2001:db8:::1', 'localhost'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    inputs: INPUTS,
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'IPv4', code: 'z.ipv4()', schema: z.ipv4() },
      { label: 'IPv6', code: 'z.ipv6()', schema: z.ipv6() },
    ],
  });

export default mount;
