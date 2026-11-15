// An async refine asks a pretend server; safeParseAsync waits for its answer
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { textField, typeLoop } from '../../shared/field.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// The pretend server's user table. Nothing leaves the page.
const TAKEN = new Set(['admin', 'ada', 'root', 'grace']);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Taken names: admin, ada, root, grace. Anything else (3+ letters) is free.' });
  // A promise that settles after `ms`, standing in for a network round trip.
  const serverDelay = (ms: number): Promise<void> => new Promise((resolve) => stage.after(ms, resolve));

  const Username = z
    .string()
    .min(3)
    .refine(
      async (name) => {
        await serverDelay(700);
        return !TAKEN.has(name.toLowerCase());
      },
      { error: 'That username is taken' },
    );

  codeLine(stage.root, 'z.string().min(3).refine(async (name) => …)');
  const field = textField(stage.root, stage, { label: 'Username', placeholder: 'pick a name', tries: ['ada', 'adam', 'root', 'ro'] });
  let latest = 0;
  field.onInput(async (text) => {
    const ticket = ++latest;
    if (!text) return field.state(null, '');
    field.state(null, 'checking with the server…');
    stage.say('safeParseAsync: waiting for the refine', 'info');
    // An async refine needs the async parse: plain safeParse would throw.
    const result = await Username.safeParseAsync(text);
    if (ticket !== latest || stage.disposed) return; // a newer keystroke won
    field.state(result.success, result.success ? `✓ "${text}" is free` : `✗ ${result.error.issues[0]!.message}`);
    stage.say(result.success ? '✓ The server said yes' : '✗ Rejected', result.success ? 'ok' : 'bad');
  });
  typeLoop(stage, field, ['ada', 'adam', 'root', 'rosa'], 2000);
  return stage.dispose;
};

export default mount;
