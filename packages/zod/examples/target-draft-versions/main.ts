// target: the same schema written for four JSON Schema dialects
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { jsonTour } from '../../shared/json-schema-view.ts';
import { createStage } from '../../shared/stage.ts';

const Slot = z.object({
  qty: z.number().gt(0).nullable(),
  kind: z.literal('box'),
});

const TARGETS = [
  { label: 'draft-2020-12 (default)', target: 'draft-2020-12' },
  { label: 'draft-07', target: 'draft-07' },
  { label: 'draft-04', target: 'draft-04' },
  { label: 'openapi-3.0', target: 'openapi-3.0' },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Highlighted lines differ from the default draft.' });
  jsonTour(
    stage,
    TARGETS.map((t) => ({
      label: t.label,
      call: `z.toJSONSchema(Slot, { target: '${t.target}' })`,
      make: () => z.toJSONSchema(Slot, { target: t.target }),
      say: t.target === 'openapi-3.0' ? 'OpenAPI has no "null" type: it writes nullable: true instead' : t.target === 'draft-04' ? 'Draft 4 spells exclusive limits and constants differently' : `Dialect: ${t.target}`,
    })),
    {
      code: `const Slot = z.object({
  qty: z.number().gt(0).nullable(),
  kind: z.literal('box'),
})`,
      short: 'z.object({ qty: z.number().gt(0).nullable(), kind: z.literal("box") })',
      keepSchemaKey: true,
      menu: 'target',
      ms: 3000,
    },
  );
  return stage.dispose;
};

export default mount;
