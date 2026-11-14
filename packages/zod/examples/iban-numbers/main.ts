// z.iban() typed live: shape plus a mod-97 checksum, electronic form only
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.iban()  // country, check digits, account, checksum',
    schema: z.iban(),
    label: 'IBAN',
    placeholder: 'DE89370400440532013000',
    okText: 'shape and checksum are right',
    hint: 'Type an IBAN with no spaces: change the last digit and the checksum fails.',
    samples: ['DE89370400440532013000', 'GB82WEST12345698765432', 'DE89 3704 0044 0532 0130 00', 'de89370400440532013000', 'DE89370400440532013001', 'DE00000000000000000066'],
    typed: ['DE89370400440532013000', 'DE89370400440532013001', 'DE89 3704'],
    cardRows: 3,
  });

export default mount;
