// z.currencyCode() typed live: real three-letter ISO 4217 codes in capitals
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.currencyCode()  // ISO 4217',
    schema: z.currencyCode(),
    label: 'Currency',
    placeholder: 'EUR',
    okText: 'a real currency code',
    samples: ['EUR', 'USD', 'JPY', 'usd', 'ANG', 'ZZZ', 'EURO'],
    typed: ['EUR', 'usd', 'ZZZ'],
  });

export default mount;
