// Compiled .validate() against .safeParse().success on the same data
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { raceBars, ratioText, timeCalls } from '../../shared/compile-race.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine, pills } from '../../shared/widgets.ts';

const Ticket = z.compile(
  z.object({ id: z.string(), title: z.string(), votes: z.number(), open: z.boolean(), owner: z.string() }),
);
const good = { id: 't1', title: 'Fix login', votes: 3, open: true, owner: 'mina' };
const bad = { ...good, votes: 'three' };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both schemas are compiled: the only difference is whether an error gets built.' });
  codeLine(stage.root, 'Ticket.safeParse(x).success   vs   Ticket.validate(x)');
  const [pSafe, pValid] = pills(stage.root, ['safeParse().success', 'validate()']);
  const bars = raceBars(stage.root, ['safeParse', 'validate']);
  let busy = false;

  const race = async (valid: boolean, count: number): Promise<void> => {
    if (busy) return;
    busy = true;
    try {
      const input = valid ? good : bad;
      pSafe!(String(Ticket.safeParse(input).success), valid ? 'ok' : 'bad');
      pValid!(String(Ticket.validate(input)), valid ? 'ok' : 'bad');
      bars.reset(`checking ${valid ? 'good' : 'bad'} data ${count} times each…`);
      const a = await timeCalls(stage, () => Ticket.safeParse(input).success, count);
      const b = await timeCalls(stage, () => Ticket.validate(input), count);
      bars.show([a, b], `validate() was ${ratioText(a, b)}`, b < a ? 'ok' : 'info');
      stage.say(valid ? '✓ on good data there is no error to skip, so the two are close' : '✓ on bad data validate() never builds the ZodError: that is the saving', 'ok');
    } finally {
      busy = false;
    }
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      for (const valid of [false, true]) {
        await race(valid, 4000);
        await wait(3200);
      }
    });
  } else if (stage.bar) {
    let valid = false;
    let count = 50000;
    select(stage.bar, 'Data', [[false, 'one wrong value'], [true, 'valid']] as const, (v) => (valid = v));
    slider(stage.bar, 'Checks', 1000, 200000, 1000, count, (v) => (count = v), (v) => v.toLocaleString());
    button(stage.bar, 'Run race', () => void race(valid, count).catch(() => undefined));
    bars.reset('Press "Run race".');
    stage.say('Press Run race.');
  }
  return stage.dispose;
};

export default mount;
