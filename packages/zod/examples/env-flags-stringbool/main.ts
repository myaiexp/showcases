// An .env-style object: stringbool flags become real booleans, bad words are named
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const Settings = z.object({
  PORT: z.coerce.number(),
  DEBUG: z.stringbool(),
  CACHE: z.stringbool(),
  TELEMETRY: z.stringbool(),
});

const SAMPLES = [
  { label: 'Good file', value: { PORT: '8080', DEBUG: 'on', CACHE: '1', TELEMETRY: 'disabled' } },
  { label: 'Typo in a flag', value: { PORT: '8080', DEBUG: 'ture', CACHE: 'yes', TELEMETRY: 'no' } },
  { label: 'Shouting', value: { PORT: '3000', DEBUG: 'TRUE', CACHE: 'Off', TELEMETRY: 'N' } },
  { label: 'A flag as a number', value: { PORT: '3000', DEBUG: 1, CACHE: 'yes', TELEMETRY: 'no' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  if (!stage.preview) codeLine(stage.root, 'z.object({ DEBUG: z.stringbool(), … })');
  const cp = checkpoint(stage.root, stage, { inTitle: '.env text', outTitle: 'Settings', types: true, messages: true });
  const editor = stage.preview ? undefined : stage.root;
  drive(
    stage,
    SAMPLES,
    (value) => {
      const result = Settings.safeParse(value);
      cp.show(value, result);
      if (result.success) stage.say('✓ every flag word became true or false', 'ok');
      else stage.say(`✗ ${result.error.issues.map((i) => i.path.join('.')).join(', ')}: not a yes or no word`, 'bad');
    },
    { editor },
  );
  return stage.dispose;
};

export default mount;
