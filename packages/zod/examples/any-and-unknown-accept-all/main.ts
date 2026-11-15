// z.any() and z.unknown() against odd values and an object key that may be missing
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaMatrix } from '../../shared/schema-matrix.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, stage.preview ? 'z.any()  { a: z.any() }' : 'z.any()  z.unknown()  { a: z.any() }');
  schemaMatrix(
    stage.root,
    stage,
    [
      { head: 'any()', short: 'any', schema: z.any() },
      ...(stage.preview ? [] : [{ head: 'unknown()', schema: z.unknown() }]),
      { head: '{ a: any() }', short: 'a: any', schema: z.object({ a: z.any() }) },
      { head: '{ a: any().optional() }', short: 'a: any?', schema: z.object({ a: z.any().optional() }) },
    ],
    [
      { label: "'text'", value: 'text' },
      { label: 'null', value: null },
      { label: 'NaN', value: NaN },
      { label: '{ }', value: {} },
      { label: '{ a: undefined }', value: { a: undefined } },
    ],
  );
  stage.say('The values pass whatever they are. Only the missing key a is a problem, and only without optional()');
  return stage.dispose;
};

export default mount;
