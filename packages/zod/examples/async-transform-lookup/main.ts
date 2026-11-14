// An async transform that swaps a user id for a record from a pretend directory
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { button } from '../../shared/controls.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const DIRECTORY: Record<string, { name: string; plan: string }> = {
  u_ada: { name: 'Ada Lovelace', plan: 'pro' },
  u_grace: { name: 'Grace Hopper', plan: 'free' },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The lookup takes about 700 ms: the right-hand pane says "checking…" until the transform resolves.' });

  // The directory is pretend: a stage timer plays the part of the server.
  const IdToUser = z
    .string()
    .startsWith('u_')
    .transform(async (id, tctx) => {
      await stage.wait(700);
      const user = DIRECTORY[id];
      if (!user) {
        tctx.issues.push({ code: 'custom', message: `No user with id ${id}`, input: id });
        return z.NEVER;
      }
      return { id, ...user };
    });

  codeLine(stage.root, 'z.string().startsWith("u_").transform(async id => lookup(id))');
  const check = checkpoint(stage.root, stage, { label: 'safeParseAsync', inTitle: 'User id', outTitle: 'Result' });
  let run = 0;
  const show = async (input: unknown): Promise<void> => {
    const mine = ++run;
    check.pending(input, 'looking up…');
    stage.say('Waiting for the async transform…', 'info');
    try {
      const result = await IdToUser.safeParseAsync(input);
      if (mine !== run || stage.disposed) return;
      check.show(input, result);
      stage.say(result.success ? `✓ The id became the record for ${result.data.name}` : `✗ ${result.error.issues[0]!.message}`, result.success ? 'ok' : 'bad');
    } catch {
      // The stage was disposed while the pretend server was thinking.
    }
  };
  if (stage.bar) {
    button(stage.bar, 'Try plain safeParse', () => {
      try {
        IdToUser.safeParse('u_ada');
      } catch (err) {
        stage.say(`safeParse throws on an async transform: ${(err as Error).message}`, 'warn');
      }
    });
  }
  drive(
    stage,
    [
      { label: 'u_ada', value: 'u_ada' },
      { label: 'u_zed (unknown)', value: 'u_zed' },
      { label: 'ada (no u_ prefix)', value: 'ada' },
      { label: 'u_grace', value: 'u_grace' },
    ],
    (v) => void show(v),
    { editor: stage.root, ms: 3200 },
  );
  return stage.dispose;
};

export default mount;
