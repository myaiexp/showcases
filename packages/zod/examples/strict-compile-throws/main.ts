// z.compile(schema, { strict: true }): what compiles, what throws
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

const CASES: Case[] = [
  { code: 'plain object', schema: z.object({ id: z.string() }) },
  { code: 'catch(value)', schema: z.string().catch('anon') },
  { code: 'async refine', schema: z.string().refine(async (v) => v.length > 1) },
  { code: 'async transform', schema: z.string().transform(async (v) => v) },
  { code: 'coerce', schema: z.coerce.number() },
  { code: 'xor', schema: z.xor([z.string(), z.number()]) },
  { code: 'catch(function)', schema: z.string().catch(() => 'anon') },
];

function strict(schema: z.ZodType): Result {
  try {
    z.compile(schema, { strict: true });
    return { success: true, data: 'compiled' };
  } catch (err) {
    return { success: false, error: { issues: [{ path: [], message: `threw ${(err as Error).constructor.name}` }] } };
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every row is a real call: z.compile(schema, { strict: true }).' });
  codeLine(stage.root, 'z.compile(schema, { strict: true })');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Schema', outTitle: 'strict compile' });
  const results = CASES.map((c) => ({ input: c.code, result: strict(c.schema) }));
  rows.show(results);
  const threw = results.filter((r) => !r.result.success).length;
  stage.say(`${threw} of ${CASES.length} threw instead of quietly falling back: async ones say so, the rest are "unsupported"`, 'info');
  return stage.dispose;
};

export default mount;
