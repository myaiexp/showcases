// z.creditCard() typed live: one wrong digit breaks the Luhn checksum
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.creditCard()  // 12 to 19 digits, Luhn checksum',
    schema: z.creditCard(),
    label: 'Card',
    placeholder: '4111 1111 1111 1111',
    okText: 'length and checksum are right',
    hint: 'Type a test card number: change one digit and the checksum fails.',
    samples: ['4111111111111111', '4111 1111 1111 1111', '4111-1111-1111-1111', '4111111111111112', '4111  1111 1111 1111', '4111.1111.1111.1111'],
    typed: ['4111 1111 1111 1111', '4111 1111 1111 1112', '4111  1111'],
  });

export default mount;
