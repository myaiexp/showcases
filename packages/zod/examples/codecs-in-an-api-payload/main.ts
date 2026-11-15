// An object with codec fields: a JSON payload decodes and encodes back
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { runTrip } from '../../shared/codec-trip.ts';
import { drive } from '../../shared/drive.ts';
import { pipelineView } from '../../shared/pipeline-view.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const bigId = z.codec(z.string(), z.bigint(), { decode: (s) => BigInt(s), encode: (n) => n.toString() });
const isoDate = z.codec(z.iso.datetime(), z.date(), { decode: (s) => new Date(s), encode: (d) => d.toISOString() });
const link = z.codec(z.url(), z.instanceof(URL), { decode: (s) => new URL(s), encode: (u) => u.href });

const Order = z.object({ id: bigId, placedAt: isoDate, receipt: link });

const SAMPLES = [
  { label: 'a good payload', value: { id: '9007199254740993', placedAt: '2024-01-15T10:30:00.000Z', receipt: 'https://shop.example/r/77' } },
  { label: 'two bad fields', value: { id: '12', placedAt: 'last Tuesday', receipt: 'not a link' } },
  { label: 'extra key', value: { id: '5', placedAt: '2024-02-01T08:00:00.000Z', receipt: 'https://shop.example/r/78', coupon: 'X' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The payload is JSON text-only data; the middle row is what the app works with.' });
  codeLine(stage.root, 'z.object({ id: bigId, placedAt: isoDate, receipt: link })');
  const view = pipelineView(stage.root, stage, { types: true });
  drive(stage, SAMPLES, (input) => {
    const rows = runTrip(Order, input);
    view.show(input, rows);
    const [dec, enc] = rows.map((r) => r.result);
    if (!dec || !dec.success) {
      const paths = dec ? dec.error.issues.map((i) => i.path.join('.') || '(whole)').join(', ') : '';
      stage.say(`✗ decode refused it at: ${paths}`, 'bad');
    } else if (enc && enc.success && Object.keys(enc.data as object).length < Object.keys(input as object).length) {
      stage.say('✓ decoded; the unknown key was dropped, so it is missing on the way back', 'warn');
    } else stage.say('✓ three text fields became a bigint, a Date and a URL, and encoded back to the same payload', 'ok');
  });
  return stage.dispose;
};

export default mount;
