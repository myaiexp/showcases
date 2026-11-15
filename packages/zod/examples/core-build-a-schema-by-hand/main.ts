// $ZodString and $ZodCheckMinLength built from defs, parsed with core
import * as core from 'zod/v4/core';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// No methods anywhere: a def describes the schema, a class turns it into one.
const Text = new core.$ZodString({ type: 'string' });
const AtLeast3 = new core.$ZodString({
  type: 'string',
  checks: [new core.$ZodCheckMinLength({ check: 'min_length', minimum: 3 })],
});

const parser = (schema: core.$ZodType) => ({ safeParse: (input: unknown) => core.safeParse(schema, input) });

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch between the bare text schema and the one with a check.',
    inputs: ['ab', 'abc', 42],
    inTitle: 'Value',
    outTitle: 'core.safeParse says',
    noun: 'values',
    variants: [
      { label: 'Text', code: 'new $ZodString({ type: "string" })', schema: parser(Text), say: 'A bare text schema: anything that is text passes, a number does not' },
      {
        label: 'Text with a check',
        code: 'new $ZodString({ type: "string", checks: [new $ZodCheckMinLength({ check: "min_length", minimum: 3 })] })',
        schema: parser(AtLeast3),
        say: 'The same def plus one check object: now two letters are too short',
      },
    ],
  });

export default mount;
