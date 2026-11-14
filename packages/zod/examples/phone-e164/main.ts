// z.e164() typed live: a plus, a country code and 7 to 15 digits
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.e164()  // + country code + number',
    schema: z.e164(),
    label: 'Phone',
    placeholder: '+358401234567',
    okText: 'a valid international number',
    samples: ['+358401234567', '+15555555555', '555-555-5555', '+1 555 555 5555', '15555555555', '+0123456789', '+1555'],
    typed: ['+358401234567', '555-555-5555', '+1 555 555 5555'],
  });

export default mount;
