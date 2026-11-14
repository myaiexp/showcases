// z.never() against a spread of ordinary values: every one is rejected
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const INPUTS = ['hello', 0, false, null, undefined, [], 'never'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(stage, [{ label: 'z.never()', code: 'z.never()', schema: z.never(), say: 'No value passes, not even an empty one: z.never() has nothing it would accept' }], {
    inputs: INPUTS,
    cardInputs: ['hello', 0, null, undefined, []],
    types: true,
    outTitle: 'Zod says',
  });
  return stage.dispose;
};

export default mount;
