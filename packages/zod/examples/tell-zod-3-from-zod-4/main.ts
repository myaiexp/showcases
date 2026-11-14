// describe(schema): "_zod" in schema picks the Zod 4 or Zod 3 reading
import * as z from 'zod';
import * as zm from 'zod/mini';
import * as z3 from 'zod/v3';
import * as core from 'zod/v4/core';
import type { Mount } from '@/types.ts';
import { factTable, type Fact } from '../../shared/fact-table.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// ---- The "library": it accepts a schema from either major version.
function describe(schema: z3.ZodTypeAny | core.$ZodType, sample: unknown): string {
  if ('_zod' in schema) {
    const ok = core.safeParse(schema, sample).success;
    return `Zod 4: _zod.def.type is "${schema._zod.def.type}"; parsing ${JSON.stringify(sample)} ${ok ? '✓' : '✗'}`;
  }
  const ok = schema.safeParse(sample).success;
  return `Zod 3: _def.typeName is "${(schema._def as { typeName: string }).typeName}"; parsing ${JSON.stringify(sample)} ${ok ? '✓' : '✗'}`;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The library sees three schemas and has to work out which Zod made each.' });
  codeLine(stage.root, '"_zod" in schema  ?  Zod 4  :  Zod 3');
  const table = factTable(stage.root, stage);
  const facts: Fact[] = [
    { label: 'zod', sub: 'Zod 4 classic', text: describe(z.number().int(), 7), tone: 'ok' },
    { label: 'zod/mini', sub: 'Zod 4 Mini', text: describe(zm.string(), 7), tone: 'ok' },
    { label: 'zod/v3', sub: 'Zod 3', text: describe(z3.string(), 7), tone: 'bad' },
  ];
  table.show(facts);
  stage.say('One check on _zod chooses between the two shapes: no version number needed', 'info');
  return stage.dispose;
};

export default mount;
