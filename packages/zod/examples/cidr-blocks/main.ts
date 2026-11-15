// Address ranges through z.cidrv4() and z.cidrv6()
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      {
        label: 'IPv4 range',
        code: 'z.cidrv4()',
        schema: z.cidrv4(),
        inputs: ['192.168.0.0/24', '10.0.0.0/8', '192.168.0.0/33', '192.168.0.0', '2001:db8::/32'],
      },
      {
        label: 'IPv6 range',
        code: 'z.cidrv6()',
        schema: z.cidrv6(),
        inputs: ['2001:db8::/32', 'fe80::/10', '2001:db8::/129', '2001:db8::', '10.0.0.0/8'],
      },
    ],
  });

export default mount;
