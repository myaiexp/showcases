// A handleQuery(schema, query) built on zod/v4/core, with Zod and Mini
import * as z from 'zod';
import * as zm from 'zod/mini';
import * as core from 'zod/v4/core';
import type { Mount } from '@/types.ts';
import type { Result } from '../../shared/verdict.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// ---- The "library": it never imports zod or zod/mini, only the shared base in zod/v4/core.
function handleQuery<T extends core.$ZodType>(schema: T, query: string): { status: 200; body: core.output<T> } | { status: 400; problems: string[] } {
  const params = Object.fromEntries(new URLSearchParams(query));
  const result = core.safeParse(schema, params);
  if (result.success) return { status: 200, body: result.data };
  return { status: 400, problems: result.error.issues.map((i) => `${i.path.join('.') || '(query)'}: ${i.message}`) };
}

// ---- The user's schemas: the same rule, written both ways.
const ClassicQuery = z.object({ page: z.coerce.number().int().min(1), sort: z.enum(['new', 'top']) });
const MiniQuery = zm.object({ page: zm.coerce.number().check(zm.gte(1)), sort: zm.enum(['new', 'top']) });

// The view wants a Result: turn the helper's reply into one.
const viaHelper = (schema: core.$ZodType) => ({
  safeParse(query: unknown): Result {
    const reply = handleQuery(schema, String(query));
    if (reply.status === 200) return { success: true, data: reply.body };
    return { success: false, error: { issues: reply.problems.map((message) => ({ path: [], message })) } };
  },
});

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch the schema: the helper code is identical.',
    inputs: ['page=2&sort=top', 'page=0&sort=top', 'page=2&sort=oldest'],
    inTitle: 'URL query',
    outTitle: 'handleQuery replies',
    noun: 'queries',
    variants: [
      { label: 'Zod schema', code: 'handleQuery(z.object({ page: z.coerce.number().int().min(1), sort: z.enum([…]) }), query)', schema: viaHelper(ClassicQuery), say: 'The helper accepted a regular Zod schema' },
      { label: 'Zod Mini schema', code: 'handleQuery(zm.object({ page: zm.coerce.number().check(zm.gte(1)), sort: zm.enum([…]) }), query)', schema: viaHelper(MiniQuery), say: 'The same helper accepted a Zod Mini schema: it only used the core base' },
    ],
  });

export default mount;
