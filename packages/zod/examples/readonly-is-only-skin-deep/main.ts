// .readonly() freezes the top object only: the array inside can still grow
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { columns, logLine } from '../../shared/side-by-side.ts';
import { createStage } from '../../shared/stage.ts';
import { valueView } from '../../shared/value-view.ts';
import { codeLine } from '../../shared/widgets.ts';

const Account = z.object({ name: z.string(), tags: z.array(z.string()) }).readonly();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Try both edits on the readonly account.' });
  codeLine(stage.root, 'z.object({ name: z.string(), tags: z.array(z.string()) }).readonly()');
  const [top, inner] = columns(stage.root, ['The account', 'The tags inside']);
  const account = Account.parse({ name: 'fido', tags: ['vip'] }) as { name: string; tags: string[] };
  const paint = (): void => {
    top!.body.replaceChildren(valueView({ name: account.name }));
    inner!.body.replaceChildren(valueView(account.tags));
  };
  const tries = [
    { label: "account.name = 'simba'", go: (): void => { try { account.name = 'simba'; logLine(top!, '✓ changed', 'ok'); } catch { logLine(top!, '✗ TypeError: refused', 'bad'); } } },
    {
      label: "account.tags.push('late')",
      go: (): void => {
        try {
          account.tags.push(`tag${account.tags.length}`);
          logLine(inner!, '✓ changed: not frozen', 'ok');
        } catch {
          logLine(inner!, '✗ TypeError: refused', 'bad');
        }
      },
    },
  ];
  const run = (i: number): void => {
    tries[i]!.go();
    paint();
    stage.say(`The account is frozen (Object.isFrozen: ${Object.isFrozen(account)}); the tags inside are not (${Object.isFrozen(account.tags)})`, 'warn');
  };
  paint();
  stage.say('Zod freezes the object it returns, and nothing deeper', 'warn');
  if (stage.bar) tries.forEach((t, i) => button(stage.bar!, t.label, () => run(i)));
  else {
    let n = 0;
    stage.every(1800, () => {
      if (n >= 6) {
        account.tags.length = 1;
        n = 0;
        top!.log.textContent = '';
        inner!.log.textContent = '';
        paint();
        return;
      }
      run(n++ % 2);
    });
  }
  return stage.dispose;
};

export default mount;
