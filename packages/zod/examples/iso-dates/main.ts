// z.iso.date() typed live: YYYY-MM-DD, and the day has to exist
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { typedDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  typedDemo(el, ctx, {
    code: 'z.iso.date()  // YYYY-MM-DD',
    schema: z.iso.date(),
    label: 'Date',
    placeholder: '2020-01-31',
    okText: 'a real calendar date',
    samples: ['2020-01-01', '2020-02-29', '2021-02-29', '2020-1-1', '2020-01-32', '01/02/2020'],
    typed: ['2020-02-29', '2021-02-29', '2020-1-1'],
  });

export default mount;
