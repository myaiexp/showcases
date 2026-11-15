// fieldsOf(schema) reads def.shape for Zod and Zod Mini schemas
import * as z from 'zod';
import * as zm from 'zod/mini';
import type * as core from 'zod/v4/core';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { factTable, type Fact } from '../../shared/fact-table.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// ---- The "library": any object schema in, a list of fields out.
// A wrapper (optional, default, nullable) is named by what it wraps.
function typeWord(field: core.$ZodType): string {
  const def = field._zod.def as { type: string; innerType?: core.$ZodType };
  if (def.type === 'nullable') return `${typeWord(def.innerType!)} or null`;
  if (def.innerType) return typeWord(def.innerType);
  return def.type;
}

function fieldsOf<T extends core.$ZodObject>(schema: T): Fact[] {
  const shape = schema._zod.def.shape as Record<string, core.$ZodType>;
  return Object.entries(shape).map(([name, field]) => {
    const optional = field._zod.optin === 'optional';
    return { label: name, text: `${typeWord(field)}${optional ? ' · optional' : ' · required'}`, tone: optional ? undefined : 'ok' };
  });
}

const SCHEMAS = [
  { label: 'Zod: profile', code: 'z.object({ name: z.string(), age: z.number(), bio: z.string().optional() })', schema: z.object({ name: z.string(), age: z.number(), bio: z.string().optional() }) },
  { label: 'Zod Mini: profile', code: 'zm.object({ name: zm.string(), age: zm.number(), bio: zm.optional(zm.string()) })', schema: zm.object({ name: zm.string(), age: zm.number(), bio: zm.optional(zm.string()) }) },
  { label: 'Zod: booking', code: 'z.object({ guests: z.number().int(), arrival: z.date(), vegan: z.boolean().default(false) })', schema: z.object({ guests: z.number().int(), arrival: z.date(), vegan: z.boolean().default(false) }) },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a schema: the same fieldsOf() code reads each one.' });
  const code = codeLine(stage.root, '');
  const table = factTable(stage.root, stage, '6.5em');
  const at = stage.cycle(SCHEMAS, 4000, (s) => {
    code.textContent = s.code;
    table.show(fieldsOf(s.schema));
    stage.say(`fieldsOf() read ${Object.keys(s.schema._zod.def.shape).length} fields without knowing the schema in advance`, 'ok');
  });
  if (stage.bar) select(stage.bar, 'Schema', SCHEMAS.map((s, i) => [i, s.label] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
