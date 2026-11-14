// .validate() gives a bare true/false; the full view times it against safeParse
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';
import './style.css';

const Player = z.object({
  username: z.string(),
  xp: z.number(),
});

const INPUTS: unknown[] = [
  { username: 'billie', xp: 100 },
  { username: 42, xp: '100' },
  { username: 'ash' },
  { username: 'misty', xp: 7 },
];

/** Milliseconds for `runs` checks of every input. */
function time(runs: number, check: (v: unknown) => boolean): number {
  const t0 = performance.now();
  for (let i = 0; i < runs; i++) for (const v of INPUTS) check(v);
  return performance.now() - t0;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const list = document.createElement('div');
  list.className = 'answers';
  stage.root.append(list);
  const rows = INPUTS.map((input) => {
    const row = document.createElement('div');
    row.className = 'answer';
    const call = document.createElement('code');
    call.textContent = 'Player.validate(';
    const end = document.createElement('code');
    end.textContent = ')';
    const out = document.createElement('b');
    const data = document.createElement('span');
    data.className = 'data';
    data.textContent = JSON.stringify(input);
    row.append(call, data, end, out);
    list.append(row);
    return { row, out, input };
  });

  // Answer one row at a time, so each true/false appears on its own.
  stage.cycle(rows, 900, ({ row, out, input }, i) => {
    if (i === 0) rows.forEach((r) => (r.out.textContent = ''));
    const ok = Player.validate(input); // a plain boolean: no data, no issues
    out.textContent = ` → ${ok}`;
    row.dataset['ok'] = String(ok);
    stage.say(ok ? 'true: acceptable, nothing else to say' : 'false: no error object was built', ok ? 'ok' : 'bad');
  }, true);

  if (stage.bar) {
    const [fast, slow, ratio] = pills(stage.root, ['validate()', 'safeParse().success', 'speed-up']);
    fast!('–');
    slow!('–');
    ratio!('–');
    button(stage.bar, 'Time 50,000 rounds', () => {
      const a = time(50_000, (v) => Player.validate(v));
      const b = time(50_000, (v) => Player.safeParse(v).success);
      fast!(`${a.toFixed(1)} ms`, 'ok');
      slow!(`${b.toFixed(1)} ms`, 'warn');
      ratio!(`${(b / a).toFixed(1)}×`, 'info');
    });
  }
  return stage.dispose;
};

export default mount;
