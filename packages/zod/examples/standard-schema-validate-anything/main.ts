// One checkStandard() fed Zod, Zod Mini and a hand-written schema
import * as z from 'zod';
import * as zm from 'zod/mini';
import type { Mount } from '@/types.ts';
import type { Result } from '../../shared/verdict.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// ---- The "library": it knows nothing about Zod, only the ~standard property.
interface Std {
  readonly '~standard': {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (value: unknown) => { value: unknown; issues?: undefined } | { issues: readonly { message: string; path?: readonly (PropertyKey | { key: PropertyKey })[] }[] } | Promise<unknown>;
  };
}

function checkStandard(schema: Std, value: unknown): Result {
  const raw = schema['~standard'].validate(value);
  if (raw instanceof Promise) throw new Error('this demo only handles synchronous schemas');
  const out = raw as { value?: unknown; issues?: readonly { message: string; path?: readonly (PropertyKey | { key: PropertyKey })[] }[] };
  if (!out.issues) return { success: true, data: out.value };
  const key = (k: PropertyKey | { key: PropertyKey }): PropertyKey => (typeof k === 'object' ? k.key : k);
  return { success: false, error: { issues: out.issues.map((i) => ({ path: (i.path ?? []).map(key), message: i.message })) } };
}

// ---- Three schemas: Zod, Zod Mini, and one that is not Zod at all.
const Zod = z.object({ name: z.string(), age: z.number().min(0) });
const Mini = zm.object({ name: zm.string(), age: zm.number().check(zm.gte(0)) });
const ByHand: Std = {
  '~standard': {
    version: 1,
    vendor: 'hand-written',
    validate(value) {
      const v = value as { name?: unknown; age?: unknown } | null;
      if (v && typeof v.name === 'string' && typeof v.age === 'number' && v.age >= 0) return { value: v };
      return { issues: [{ message: 'needs a text name and an age of 0 or more' }] };
    },
  },
};

const wrap = (schema: Std) => ({ safeParse: (value: unknown) => checkStandard(schema, value) });

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch the schema: checkStandard() is the same function each time.',
    inputs: [{ name: 'Ana', age: 31 }, { name: 'Ana', age: -1 }, { name: 7, age: 31 }],
    inTitle: 'Person',
    outTitle: 'checkStandard()',
    noun: 'people',
    variants: [
      { label: `Zod (${Zod['~standard'].vendor})`, code: 'checkStandard(z.object({ name, age }), person)', schema: wrap(Zod), say: 'Zod answers through ~standard.validate with a vendor name of "zod"' },
      { label: `Zod Mini (${Mini['~standard'].vendor})`, code: 'checkStandard(zm.object({ name, age }), person)', schema: wrap(Mini), say: 'Zod Mini speaks the same interface' },
      { label: 'Hand-written', code: 'checkStandard({ "~standard": { validate } }, person)', schema: wrap(ByHand), say: 'Even an object with no library behind it works: the interface is the whole contract' },
    ],
  });

export default mount;
