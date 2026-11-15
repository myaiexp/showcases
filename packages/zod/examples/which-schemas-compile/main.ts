// z.compile() on assorted schemas: a copy, or the same schema back
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import type { Result } from '../../shared/verdict.ts';
import { codeLine } from '../../shared/widgets.ts';

interface Case {
  code: string;
  schema: z.ZodType;
}

const tree: z.ZodType = z.object({ name: z.string(), get kids() { return z.array(tree); } });

const CASES: Case[] = [
  { code: 'coerce in object', schema: z.object({ a: z.string(), n: z.coerce.number() }) },
  { code: 'coerce in array', schema: z.array(z.coerce.number()) },
  { code: 'xor in object', schema: z.object({ a: z.xor([z.string(), z.number()]) }) },
  { code: 'coerce alone', schema: z.coerce.number() },
  { code: 'coerce in union', schema: z.union([z.string(), z.coerce.number()]) },
  { code: 'xor alone', schema: z.xor([z.string(), z.number()]) },
  { code: 'async check', schema: z.string().refine(async (v) => v.length > 1) },
  { code: 'recursive', schema: tree },
];

/** What z.compile() did: a different (compiled) schema, or the schema it was given. */
function outcome(schema: z.ZodType): Result {
  const out = z.compile(schema);
  return out === schema ? { success: false, error: { issues: [{ path: [], message: 'same schema back (not compiled)' }] } } : { success: true, data: 'compiled copy' };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every row is a real call to z.compile(): the tick means it made a faster copy.' });
  codeLine(stage.root, 'z.compile(schema) === schema ?');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Schema', outTitle: 'z.compile() gave', showOutput: true });
  const results = (stage.preview ? CASES.slice(0, 7) : CASES).map((c) => ({ input: c.code, result: outcome(c.schema) }));
  rows.show(results);
  const copies = results.filter((r) => r.result.success).length;
  stage.say(`${copies} of ${results.length} schemas compiled; the rest came back unchanged and parse on the standard parser`, 'info');
  return stage.dispose;
};

export default mount;
