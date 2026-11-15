// A registry whose examples must match each schema's output type, checked as test data
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows, type Row } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, plural } from '../../shared/widgets.ts';

// z.$output stands for "whatever this schema produces": each schema gets its own examples type.
const docs = z.registry<{ examples: z.$output[] }>();

const Slug = z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/).register(docs, { examples: ['tea-notes', 'Spring-Sale'] });
// @ts-expect-error 'two' is not a number: the editor refuses this example, and so does the schema
const Qty = z.coerce.number().int().min(1).register(docs, { examples: [1, 24, 'two'] });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every example stored with a schema is run through that schema.' });
  codeLine(stage.root, 'docs.get(schema).examples → schema.safeParse(example)');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Stored example', outTitle: 'Its own schema says' });
  const all: Row[] = [
    ...(docs.get(Slug)?.examples ?? []).map((input) => ({ input, result: Slug.safeParse(input), note: 'Slug' })),
    ...(docs.get(Qty)?.examples ?? []).map((input) => ({ input, result: Qty.safeParse(input), note: 'Qty' })),
  ];
  rows.show(all);
  const bad = all.filter((r) => !r.result.success).length;
  stage.say(`${plural(all.length, 'example')} stored, ${bad} of them does not fit its schema`, bad ? 'warn' : 'ok');
  return stage.dispose;
};

export default mount;
