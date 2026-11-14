// z.withParser: an outside parser answers; z.INVALID hands back
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { checkpoint } from '../../shared/checkpoint.ts';
import { drive } from '../../shared/drive.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, pills, plural } from '../../shared/widgets.ts';

const Player = z.object({ username: z.string(), xp: z.number() });

// Stand-in for a generated type guard: it knows nothing about Zod.
const isPlayer = (x: unknown): x is { username: string; xp: number } =>
  typeof x === 'object' && x !== null && typeof (x as { username?: unknown }).username === 'string' && typeof (x as { xp?: unknown }).xp === 'number';

const SAMPLES = [
  { label: 'a good player', value: { username: 'billie', xp: 100 } },
  { label: 'extra key', value: { username: 'billie', xp: 100, admin: true } },
  { label: 'xp is text', value: { username: 'billie', xp: '100' } },
  { label: 'not an object', value: 'billie' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The parser is plain code; Zod only builds errors when it says INVALID.' });
  let answered = 0;
  let handedBack = 0;
  const Fast = z.withParser(Player, (input) => {
    if (isPlayer(input)) {
      answered++;
      // The parser owns the whole result, so it rebuilds the object: z.object() strips unknown keys.
      return { username: input.username, xp: input.xp };
    }
    handedBack++;
    return z.INVALID;
  });
  codeLine(stage.root, 'z.withParser(Player, (input) => isPlayer(input) ? {…} : z.INVALID)');
  const [pAnswered, pBack] = pills(stage.root, ['your parser answered', 'handed back to Zod']);
  const check = checkpoint(stage.root, stage, { label: 'Fast.safeParse', types: true });
  drive(stage, SAMPLES, (input) => {
    answered = 0;
    handedBack = 0;
    const result = Fast.safeParse(input);
    pAnswered!(String(answered), answered ? 'ok' : 'info');
    pBack!(String(handedBack), handedBack ? 'warn' : 'info');
    check.show(input, result);
    stage.say(
      result.success ? '✓ the outside parser answered: Zod did no checking of its own' : `✗ INVALID went back to Zod, which built the usual ${plural(result.error.issues.length, 'issue')}`,
      result.success ? 'ok' : 'bad',
    );
  }, { editor: stage.root });
  return stage.dispose;
};

export default mount;
