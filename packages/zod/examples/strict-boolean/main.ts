// z.boolean() rejects every lookalike: text, numbers, null
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const INPUTS = [true, false, 'true', 'false', 1, 0, 'yes', null];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(
    stage,
    [{ label: 'z.boolean()', code: 'z.boolean()', schema: z.boolean(), say: 'Only the two real booleans pass: the text true and the number 1 are different things' }],
    { inputs: INPUTS, cardInputs: [true, false, 'true', 1, 'yes', null], types: true, outTitle: 'Zod says' },
  );
  return stage.dispose;
};

export default mount;
