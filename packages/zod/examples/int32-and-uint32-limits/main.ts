// z.int32() and z.uint32() at the edges of what 32 bits can store
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const INPUTS = [0, -1, 2147483647, 2147483648, -2147483648, -2147483649, 4294967295, 4294967296];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(
    stage,
    [
      { label: 'z.int32()', code: 'z.int32()  // -2147483648 … 2147483647', schema: z.int32(), say: 'int32 holds both signs but stops at 2147483647' },
      { label: 'z.uint32()', code: 'z.uint32()  // 0 … 4294967295', schema: z.uint32(), say: 'uint32 has no negatives and goes twice as high' },
    ],
    { inputs: INPUTS, cardInputs: [-1, 2147483647, 2147483648, -2147483649, 4294967295, 4294967296], inTitle: 'Number', outTitle: 'Zod says', ms: 3800 },
  );
  return stage.dispose;
};

export default mount;
