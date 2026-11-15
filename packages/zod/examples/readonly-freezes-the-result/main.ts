// .readonly() freezes the parsed object: each edit attempt is refused
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { columns, logLine, type Column } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { valueView } from '../../shared/value-view.ts';
import { codeLine } from '../../shared/widgets.ts';

const Open = z.object({ name: z.string(), plan: z.string() });
const Frozen = Open.readonly();

const ATTEMPTS: { code: string; run: (u: Record<string, unknown>) => void }[] = [
  { code: "user.name = 'simba'", run: (u) => { u['name'] = 'simba'; } },
  { code: "user.admin = true", run: (u) => { u['admin'] = true; } },
  { code: 'delete user.plan', run: (u) => { delete u['plan']; } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click an edit to try it on both versions.' });
  codeLine(stage.root, "Open = z.object({…})   Frozen = Open.readonly()");
  const cols = columns(stage.root, ['Plain .parse()', '.readonly()']);
  const a = cols[0]!;
  const b = cols[1]!;
  const input = { name: 'fido', plan: 'free' };
  const open = Open.parse(input) as Record<string, unknown>;
  const frozen = Frozen.parse(input) as Record<string, unknown>;
  const paint = (): void => {
    a.body.replaceChildren(valueView(open));
    b.body.replaceChildren(valueView(frozen));
  };
  const attempt = (i: number): void => {
    const at = ATTEMPTS[i]!;
    const tell = (target: Record<string, unknown>, col: Column): void => {
      try {
        at.run(target);
        logLine(col, '✓ changed', 'ok');
      } catch (err) {
        logLine(col, `✗ ${(err as Error).name}: refused`, 'bad');
      }
    };
    tell(open, a);
    tell(frozen, b);
    paint();
    stage.say(`${at.code}: the plain object took it, the readonly one threw a TypeError and kept its value`, 'info');
    // Put the plain copy back so the next try starts from the same user.
    stage.after(stage.preview ? 1100 : 1600, () => {
      Object.keys(open).forEach((k) => delete open[k]);
      Object.assign(open, input);
      paint();
    });
  };
  paint();
  stage.say('A frozen result: every edit throws', 'info');
  if (stage.bar) {
    ATTEMPTS.forEach((t, i) => {
      button(stage.bar!, t.code, () => attempt(i));
    });
  } else {
    let n = 0;
    stage.every(2200, () => attempt(n++ % ATTEMPTS.length));
    attempt(n++);
  }
  return stage.dispose;
};

export default mount;
