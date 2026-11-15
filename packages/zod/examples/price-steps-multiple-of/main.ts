// Prices checked by multipleOf: only values on a fixed step get in
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const Cents = z.number().multipleOf(0.05);
// step() is the documented alias of multipleOf().
const Fives = z.number().step(5);

const PRICES = [1.2, 4.95, 0.15, 19.99, 0.1 + 0.2, 7.5, 10];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The rows show each price as the number Zod received.' });
  schemaTour(
    stage,
    [
      { label: 'multipleOf(0.05)', code: 'z.number().multipleOf(0.05)', schema: Cents, say: 'Only prices on the 5 cent grid pass: 19.99 is off it, while 0.1 + 0.2 (really 0.30000000000000004) still counts as 0.30' },
      { label: 'step(5)', code: 'z.number().step(5)  // same as multipleOf(5)', schema: Fives, say: 'step(5) is multipleOf(5): only 10 of these lands on a multiple of 5' },
    ],
    { inputs: PRICES, cardInputs: [1.2, 4.95, 19.99, 0.1 + 0.2, 7.5, 10], inTitle: 'Price', outTitle: 'Zod says', noun: 'prices' },
  );
  return stage.dispose;
};

export default mount;
