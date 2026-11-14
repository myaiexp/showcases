// A quantity field through z.number() and z.int(): fractions and huge values
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const QTY = [3, -2, 2.5, 0.1, 9007199254740991, 9007199254740992, 1e21];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Quantities as the form delivered them (as numbers, not text).' });
  schemaTour(
    stage,
    [
      { label: 'z.number()', code: 'z.number()', schema: z.number(), say: 'z.number() accepts every finite quantity, fractions included' },
      { label: 'z.int()', code: 'z.int()  // whole numbers in the safe range', schema: z.int(), say: 'z.int() rejects fractions, and numbers past 9007199254740991 where whole numbers stop being exact' },
    ],
    { inputs: QTY, cardInputs: [3, 2.5, 0.1, 9007199254740991, 9007199254740992, 1e21], inTitle: 'Quantity', outTitle: 'Zod says' },
  );
  return stage.dispose;
};

export default mount;
