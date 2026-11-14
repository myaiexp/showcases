// A generator switches on def.type and writes the TypeScript type
import * as z from 'zod';
import type * as core from 'zod/v4/core';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, note } from '../../shared/widgets.ts';

// The tool: it only sees core types, so it works for Zod, Zod Mini and anything built on core.
function typeOf(_schema: core.$ZodType): string {
  const schema = _schema as core.$ZodTypes;
  const def = schema._zod.def;
  switch (def.type) {
    case 'string':
    case 'number':
    case 'boolean':
      return def.type;
    case 'object':
      return `{ ${Object.entries(def.shape)
        .map(([key, value]) => `${key}${(value as core.$ZodType)._zod.optin === 'optional' ? '?' : ''}: ${typeOf(value as core.$ZodType)}`)
        .join('; ')} }`;
    case 'array':
      return `${typeOf(def.element as core.$ZodType)}[]`;
    case 'optional':
      return `${typeOf(def.innerType as core.$ZodType)} | undefined`;
    case 'nullable':
      return `${typeOf(def.innerType as core.$ZodType)} | null`;
    case 'enum':
      return Object.values(def.entries).map((v) => JSON.stringify(v)).join(' | ');
    case 'literal':
      return def.values.map((v) => JSON.stringify(v)).join(' | ');
    case 'union':
      return def.options.map((o) => typeOf(o as core.$ZodType)).join(' | ');
    case 'tuple':
      return `[${def.items.map((i) => typeOf(i as core.$ZodType)).join(', ')}]`;
    default:
      // A schema type this tool does not know: say so and carry on, never throw.
      return `unknown /* ${def.type} */`;
  }
}

const SCHEMAS = [
  { label: 'Sign-up', code: 'z.object({ username, plan, tags, bio })', schema: z.object({ username: z.string(), plan: z.enum(['free', 'pro']), tags: z.array(z.string()), bio: z.string().optional() }) },
  { label: 'Order line', code: 'z.object({ sku, qty, gift })', schema: z.object({ sku: z.string(), qty: z.number(), gift: z.boolean().nullable() }) },
  { label: 'Point or label', code: 'z.union([tuple, string])', schema: z.union([z.tuple([z.number(), z.number()]), z.literal('origin')]) },
  { label: 'Unknown kind', code: 'z.object({ when: z.date(), id: z.string() })', schema: z.object({ when: z.date(), id: z.string() }) },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The generator never saw these schemas before: it only reads def.type.' });
  const code = codeLine(stage.root, '');
  const out = note(stage.root);
  out.style.fontFamily = 'var(--font-mono)';
  out.style.whiteSpace = 'pre-wrap';
  const at = stage.cycle(SCHEMAS, 3600, (s) => {
    code.textContent = s.code;
    const text = typeOf(s.schema);
    out.textContent = `type T = ${text};`;
    out.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260 });
    stage.say(text.includes('unknown /*') ? 'A type the tool does not know becomes unknown, with a comment: it keeps going' : 'Every field was read from the schema itself', text.includes('unknown /*') ? 'warn' : 'ok');
  });
  if (stage.bar) select(stage.bar, 'Schema', SCHEMAS.map((s, i) => [i, s.label] as const), (i) => at(i));
  return stage.dispose;
};

export default mount;
