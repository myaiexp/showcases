// A codec with async decode and encode: sync calls throw
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { attempt } from '../../shared/codec-trip.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const PRICES: Record<string, number> = { 'tea-100g': 4.5, 'mug-blue': 9, 'tin-large': 12.25 };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The shop lookup is pretended with a short wait: no network.' });
  // A pretend lookup: a promise that settles through the stage (and just never settles after dispose).
  const pause = (): Promise<void> => new Promise((resolve) => stage.after(450, resolve));
  // The "price list" answers after a pause, so decode and encode must be async.
  const priceOf = z.codec(z.string(), z.number(), {
    decode: async (sku, payload) => {
      await pause();
      const price = PRICES[sku];
      if (price === undefined) {
        payload.issues.push({ code: 'custom', input: sku, message: `No product called "${sku}"` });
        return z.NEVER;
      }
      return price;
    },
    encode: async (price) => {
      await pause();
      return Object.keys(PRICES).find((k) => PRICES[k] === price) ?? '?';
    },
  });

  const call = codeLine(stage.root, '');
  const check = checkpoint(stage.root, stage, { label: 'priceOf', types: true });

  stage.play(async (wait) => {
    for (const sku of ['tea-100g', 'mug-blue', 'sock-red']) {
      call.textContent = `z.safeDecode(priceOf, "${sku}")`;
      const sync = attempt(() => z.safeDecode(priceOf, sku));
      check.show(sku, sync);
      stage.say('✗ plain safeDecode cannot wait for a Promise: it throws', 'bad');
      await wait(1700);
      call.textContent = `await z.safeDecodeAsync(priceOf, "${sku}")`;
      check.pending(sku, 'looking it up…');
      stage.say('… the lookup is running', 'info');
      const res = await z.safeDecodeAsync(priceOf, sku);
      check.show(sku, res);
      stage.say(res.success ? `✓ the async decode finished: ${res.data}` : '✗ the async decode finished: the lookup found nothing', res.success ? 'ok' : 'bad');
      await wait(1700);
      if (res.success) {
        call.textContent = `await z.safeEncodeAsync(priceOf, ${res.data})`;
        check.pending(res.data, 'looking it up…');
        const back = await z.safeEncodeAsync(priceOf, res.data);
        check.show(res.data, back);
        stage.say(back.success ? `✓ and back again: ${res.data} encodes to "${back.data as string}"` : '✗ encode failed', back.success ? 'ok' : 'bad');
        await wait(1700);
      }
    }
  });
  return stage.dispose;
};

export default mount;
