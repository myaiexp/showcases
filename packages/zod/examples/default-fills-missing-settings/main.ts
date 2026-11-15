// Settings with defaults: missing fields are filled in and marked as added
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// Each field says what to use when the saved file has nothing for it.
const Settings = z.object({
  theme: z.enum(['dark', 'light']).default('dark'),
  fontSize: z.number().default(14),
  autosave: z.boolean().default(true),
  recent: z.array(z.string()).default([]),
});

const SAMPLES = [
  { label: 'empty file', value: {} },
  { label: 'one setting', value: { theme: 'light' } },
  { label: 'all set', value: { theme: 'light', fontSize: 18, autosave: false, recent: ['notes.md'] } },
  { label: 'font size as text', value: { fontSize: '18' } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a saved file or edit the JSON: missing settings get their default.' });
  codeLine(stage.root, "theme: z.enum([…]).default('dark'), fontSize: z.number().default(14), …");
  const check = checkpoint(stage.root, stage, { label: 'Settings.safeParse', inTitle: 'Saved file', outTitle: 'Settings in use' });
  drive(
    stage,
    SAMPLES,
    (input) => {
      const result = Settings.safeParse(input);
      check.show(input, result);
      if (!result.success) stage.say('✗ A default only covers a missing value: "18" as text is still wrong', 'bad');
      else {
        const added = Object.keys(Settings.shape).filter((k) => !Object.hasOwn(input as object, k)).length;
        stage.say(added ? `✓ ${added} missing ${added === 1 ? 'setting was' : 'settings were'} filled in with defaults` : '✓ Nothing was missing, so nothing was added', 'ok');
      }
    },
    { editor: stage.root },
  );
  return stage.dispose;
};

export default mount;
