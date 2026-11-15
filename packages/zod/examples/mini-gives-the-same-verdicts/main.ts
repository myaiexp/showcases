// One username rule as chained methods (Zod) and .check() calls (Mini)
import * as z from 'zod';
import * as zm from 'zod/mini';
import type { Mount } from '@/types.ts';
import { noLocale } from '../../shared/mini-locale.ts';
import { schemaMatrix } from '../../shared/schema-matrix.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// Methods that exist only in regular Zod...
const Classic = z.string().trim().min(3).max(12);
// ...become checks you pass in: nothing unused is carried along.
const Mini = zm.string().check(zm.trim(), zm.minLength(3), zm.maxLength(12));

const ROWS = [
  { label: '"ana"', value: 'ana' },
  { label: '"  ana  "', value: '  ana  ' },
  { label: '"al"', value: 'al' },
  { label: '"  al  "', value: '  al  ' },
  { label: '"a-very-long-username"', value: 'a-very-long-username' },
  { label: '42', value: 42 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Full view: the second column names the first problem; Mini has no wording loaded.' });
  codeLine(stage.root, 'string().trim().min(3).max(12)  vs  .check(trim(), minLength(3), maxLength(12))');
  schemaMatrix(
    stage.root,
    stage,
    [
      { head: 'Zod (methods)', short: 'Zod', schema: Classic },
      { head: 'Zod Mini (checks)', short: 'Mini', schema: noLocale(Mini) },
    ],
    ROWS,
  );
  stage.say('Same verdict in every row: Mini only differs in how the schema is written', 'ok');
  return stage.dispose;
};

export default mount;
