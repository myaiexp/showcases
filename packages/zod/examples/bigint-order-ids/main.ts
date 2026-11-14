// z.bigint() and its range rules on an id too large for a regular number
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const IDS: unknown[] = [9007199254740993n, 1n, 0n, -4n, 9007199254740993, '9007199254740993', 5n * 10n ** 18n];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Note 9007199254740993 as a number: JavaScript has already rounded it before Zod sees it.' });
  schemaTour(
    stage,
    [
      { label: 'bigint()', code: 'z.bigint()', schema: z.bigint(), say: 'Only real bigints pass: a number or text is rejected, even with the same digits' },
      { label: 'bigint().positive()', code: 'z.bigint().positive()  // alias gt(0n)', schema: z.bigint().positive(), say: 'Same range rules as numbers: positive() drops 0n and -4n' },
      { label: 'bigint().lt(10n ** 18n)', code: 'z.bigint().lt(10n ** 18n)', schema: z.bigint().lt(10n ** 18n), say: 'lt() compares bigints exactly, however large' },
      { label: 'bigint().multipleOf(3n)', code: 'z.bigint().multipleOf(3n)', schema: z.bigint().multipleOf(3n) },
    ],
    { inputs: IDS, cardInputs: [9007199254740993n, 0n, -4n, 9007199254740993, '9007199254740993', 5n * 10n ** 18n], types: true, outTitle: 'Zod says', ms: 3400 },
  );
  return stage.dispose;
};

export default mount;
