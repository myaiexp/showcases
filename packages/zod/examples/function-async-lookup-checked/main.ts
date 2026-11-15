// implementAsync: the call returns a promise, and bad arguments reject it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const STOCK: Record<string, number> = { 'SKU-100': 12, 'SKU-200': 0 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each lookup waits briefly for the fake server.' });
  const Lookup = z.function({ input: [z.string().startsWith('SKU-')], output: z.number().int() });
  // The "server" is a short wait, so nothing leaves the page.
  const stockLevel = Lookup.implementAsync(async (sku) => {
    await stage.wait(300);
    return STOCK[sku] ?? 0;
  });
  codeLine(stage.root, 'z.function({ input: [z.string().startsWith("SKU-")], output: …int() }).implementAsync(…)');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Call', outTitle: 'Promise settled with' });
  const CALLS: unknown[] = ['SKU-100', 'SKU-200', 'pizza', 404];
  stage.play(async (wait) => {
    rows.show([]);
    for (const arg of CALLS) {
      const text = `stockLevel(${JSON.stringify(arg)})`;
      const promise = (stockLevel as (a: unknown) => Promise<number>)(arg);
      stage.say('A promise came back straight away; waiting for it to settle…', 'info');
      const result = await promise.then(
        (data) => ({ success: true as const, data }),
        (error: z.ZodError) => ({ success: false as const, error }),
      );
      rows.add({ input: text, result });
      stage.say(result.success ? `✓ resolved with ${result.data}` : '✗ rejected with a ZodError: the lookup never ran', result.success ? 'ok' : 'bad');
      await wait(stage.preview ? 700 : 1200);
    }
    await wait(1500);
  });
  return stage.dispose;
};

export default mount;
