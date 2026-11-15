// A string <-> Date codec: parse decodes forwards, z.safeEncode runs it backwards
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const stringToDate = z.codec(
  z.iso.datetime(), // input schema: ISO date text
  z.date(), // output schema: a Date
  {
    decode: (isoString) => new Date(isoString),
    encode: (date) => date.toISOString(),
  },
);

interface Step {
  dir: 'decode' | 'encode';
  value: unknown;
}

const SAMPLES: { label: string; value: Step }[] = [
  { label: 'decode text', value: { dir: 'decode', value: '2024-01-15T10:30:00.000Z' } },
  { label: 'encode a Date', value: { dir: 'encode', value: new Date('2024-01-15T10:30:00.000Z') } },
  { label: 'decode "yesterday"', value: { dir: 'decode', value: 'yesterday' } },
  { label: 'encode text', value: { dir: 'encode', value: '2024-01-15T10:30:00.000Z' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button sends a value one way through the same codec.' });
  const code = codeLine(stage.root, '');
  const check = checkpoint(stage.root, stage, { label: 'codec', types: true });
  drive(
    stage,
    SAMPLES,
    (raw) => {
      const step = raw as Step;
      code.textContent = step.dir === 'decode' ? 'stringToDate.parse(text)   // decode' : 'z.safeEncode(stringToDate, date)   // encode';
      // An encode input of the wrong kind is the point of the last sample, so it is passed as-is.
      const result = step.dir === 'decode' ? stringToDate.safeParse(step.value) : z.safeEncode(stringToDate, step.value as Date);
      check.show(step.value, result);
      stage.say(
        result.success
          ? step.dir === 'decode'
            ? '✓ Decoded: text in, a real Date out'
            : '✓ Encoded: a Date in, text out'
          : `✗ ${step.dir} refused it: ${result.error.issues[0]!.message}`,
        result.success ? 'ok' : 'bad',
      );
    },
    { ms: 2800 },
  );
  return stage.dispose;
};

export default mount;
