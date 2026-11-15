// Eleven wrong values, one per issue code, with the code that came back
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { factTable, type Fact } from '../../shared/fact-table.ts';
import { createStage } from '../../shared/stage.ts';
import { leafText } from '../../shared/value-view.ts';
import { codeLine } from '../../shared/widgets.ts';

interface Case {
  code: string;
  schema: string;
  schemaObj: z.ZodType;
  input: unknown;
}

const CASES: Case[] = [
  { code: 'invalid_type', schema: 'z.string()', schemaObj: z.string(), input: 42 },
  { code: 'too_small', schema: 'z.string().min(3)', schemaObj: z.string().min(3), input: 'ab' },
  { code: 'too_big', schema: 'z.number().max(10)', schemaObj: z.number().max(10), input: 99 },
  { code: 'invalid_format', schema: 'z.email()', schemaObj: z.email(), input: 'ana-at-mail' },
  { code: 'not_multiple_of', schema: 'z.number().multipleOf(5)', schemaObj: z.number().multipleOf(5), input: 12 },
  { code: 'invalid_value', schema: 'z.enum(["free","pro"])', schemaObj: z.enum(['free', 'pro']), input: 'gold' },
  { code: 'unrecognized_keys', schema: 'z.strictObject({ a })', schemaObj: z.strictObject({ a: z.string() }), input: { a: 'x', b: 1 } },
  { code: 'invalid_union', schema: 'z.union([string, number])', schemaObj: z.union([z.string(), z.number()]), input: true },
  { code: 'invalid_key', schema: 'z.record(z.string().min(2), z.number())', schemaObj: z.record(z.string().min(2), z.number()), input: { x: 1 } },
  { code: 'invalid_element', schema: 'z.map(z.date(), z.number())', schemaObj: z.map(z.date(), z.number()), input: new Map([[new Date('2026-01-01'), 'x']]) },
  { code: 'custom', schema: 'z.string().refine(has "@")', schemaObj: z.string().refine((s) => s.includes('@')), input: 'ana' },
];

// Real parses: the row is "ok" only when the code that came back is the one the row is about.
function toFact(c: Case, card: boolean): Fact {
  const result = c.schemaObj.safeParse(c.input);
  const got = result.success ? 'accepted' : result.error.issues[0]!.code;
  const seen = got === c.code ? '' : `   ✗ got ${got}`;
  return { label: got, text: card ? leafText(c.input) : `${c.schema} ← ${leafText(c.input)}${seen}`, tone: got === c.code ? 'ok' : 'bad' };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'result.error.issues[0].code');
  const table = factTable(stage.root, stage);
  const facts = CASES.map((c) => toFact(c, stage.preview));
  const pages = [facts.slice(0, 6), facts.slice(5)];
  if (stage.preview) stage.cycle(pages, 4600, (page) => table.show(page));
  else table.show(facts);
  stage.say(`${facts.filter((f) => f.tone === 'ok').length} of ${facts.length} codes reproduced by a real parse`, 'info');
  return stage.dispose;
};

export default mount;
