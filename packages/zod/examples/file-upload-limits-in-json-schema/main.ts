// z.file() and its size and type limits written as an upload field's JSON Schema
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const bare = (s: z.ZodType): unknown => {
  const { $schema: _, ...rest } = z.toJSONSchema(s) as Record<string, unknown>;
  return rest;
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each line converts one schema and shows the JSON Schema it became.' });
  evalLog(
    stage,
    () => [
      { code: 'z.file()', run: () => bare(z.file()), say: 'A file is "binary" text, the way OpenAPI describes uploads' },
      { code: 'z.file().max(1024 * 1024)', run: () => bare(z.file().max(1024 * 1024)), say: 'A size limit in bytes becomes maxLength' },
      { code: 'z.file().min(1).mime("image/png")', run: () => bare(z.file().min(1).mime('image/png')), say: 'The type check becomes contentMediaType' },
    ],
    { cardRows: 3, ms: 1500, final: '✓ Size and type limits travel into the JSON Schema' },
  );
  return stage.dispose;
};

export default mount;
