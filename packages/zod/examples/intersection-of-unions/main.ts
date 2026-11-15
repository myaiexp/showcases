// number|string AND number|boolean: only the shared type survives
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { schemaMatrix } from '../../shared/schema-matrix.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const a = z.union([z.number(), z.string()]);
const b = z.union([z.number(), z.boolean()]);
const both = z.intersection(a, b);

const ROWS = [
  { label: '5', value: 5 },
  { label: '"five"', value: 'five' },
  { label: 'true', value: true },
  { label: 'null', value: null },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'z.intersection(number|string, number|boolean)');
  schemaMatrix(
    stage.root,
    stage,
    [
      { head: 'number | string', short: 'num|str', schema: a },
      { head: 'number | boolean', short: 'num|bool', schema: b },
      { head: 'intersection', short: 'both', schema: both },
    ],
    ROWS,
  );
  stage.say('Only the value both unions accept, the number, gets through the intersection', 'info');
  return stage.dispose;
};

export default mount;
