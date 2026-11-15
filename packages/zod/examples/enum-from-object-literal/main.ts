// z.enum() given an object instead of a list: its values are what passes
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaTour } from '../../shared/schema-tour.ts';
import { createStage } from '../../shared/stage.ts';

const Fish = { Salmon: 0, Tuna: 1 } as const;
const Level = { Low: 'low', High: 'high' } as const;

const INPUTS = [0, 1, 2, 'Salmon', 'low', 'Low'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  schemaTour(
    stage,
    [
      { label: 'numeric values', code: 'z.enum({ Salmon: 0, Tuna: 1 })', schema: z.enum(Fish), say: 'Values 0 and 1 pass. The name Salmon, and 2, do not' },
      { label: 'text values', code: "z.enum({ Low: 'low', High: 'high' })", schema: z.enum(Level), say: "Values 'low' and 'high' pass. The name Low does not" },
    ],
    { inputs: INPUTS, types: true, outTitle: 'Zod says' },
  );
  return stage.dispose;
};

export default mount;
