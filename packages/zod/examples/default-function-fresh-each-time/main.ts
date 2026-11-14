// A fixed default repeats; a default function runs again on every parse
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { button } from '../../shared/controls.ts';
import { columns } from '../../shared/side-by-side.ts';
import type { Result } from '../../shared/verdict.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

let counter = 1000;
const newId = (): string => `ORD-${++counter}`;

// Same schema twice. The fixed default was worked out once, when the schema was built.
const Fixed = z.object({ id: z.string().default(newId()), item: z.string() });
// A function is called every time a default is needed.
const Fresh = z.object({ id: z.string().default(newId), item: z.string() });

const ITEMS = ['tea', 'mug', 'kettle', 'spoon', 'tray', 'teapot'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Orders arrive with no id; watch the ids each schema hands out.' });
  codeLine(stage.root, "id: z.string().default('ORD-…')   versus   .default(newId)");
  const [lc, rc] = columns(stage.root, ['Fixed default', 'Function default']);
  const fixed = sampleRows(lc!.body, stage, { inTitle: 'Item', outTitle: 'id' });
  const fresh = sampleRows(rc!.body, stage, { inTitle: 'Item', outTitle: 'id' });
  let n = 0;
  const step = (): void => {
    const item = ITEMS[n++ % ITEMS.length]!;
    const input = { item };
    const a = Fixed.safeParse(input);
    const b = Fresh.safeParse(input);
    if (n > 4) {
      fixed.show([]);
      fresh.show([]);
      n = 1;
    }
    const pick = (r: Result): Result => (r.success ? { success: true, data: (r.data as { id: string }).id } : r);
    fixed.add({ input: item, result: pick(a) });
    fresh.add({ input: item, result: pick(b) });
    stage.say('The fixed default gave every order the same id; the function made a new one each time', 'info');
  };
  step();
  stage.every(stage.preview ? 1500 : 1800, step);
  if (stage.bar) {
    button(stage.bar, 'New order', step);
  }
  return stage.dispose;
};

export default mount;
