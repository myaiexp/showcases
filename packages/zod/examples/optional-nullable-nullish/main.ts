// One literal wrapped as optional, nullable and nullish, tried on undefined and null
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaMatrix } from '../../shared/schema-matrix.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Yoda = z.literal('yoda');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, "z.literal('yoda')  // wrapped three ways");
  schemaMatrix(
    stage.root,
    stage,
    [
      { head: 'optional()', short: 'opt.', schema: Yoda.optional() },
      { head: 'nullable()', short: 'null.', schema: Yoda.nullable() },
      { head: 'nullish()', short: 'nullish', schema: z.nullish(Yoda) },
    ],
    [
      { label: 'undefined', value: undefined },
      { label: 'null', value: null },
      { label: "'yoda'", value: 'yoda' },
      { label: "'vader'", value: 'vader' },
      { label: '42', value: 42 },
    ],
  );
  stage.say('undefined: optional and nullish. null: nullable and nullish. A wrong value: nobody');
  return stage.dispose;
};

export default mount;
