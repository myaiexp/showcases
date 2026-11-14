// Dexie.override(fn, factory): wrap a function, keep the original
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { log: true });
  const { log } = d;
  const original = (note: string): string => `saved "${note}"`;
  let save = original;
  d.say.set('Add behaviour to a function.', 'save = Dexie.override(save, orig => ...)');
  d.run(
    [
      d.step('Call save()', 'The plain function.', 'save("buy milk")', () => log.add(`-> ${save('buy milk')}`, 'ok')),
      d.step('Override it', 'Same name, extra behaviour.', 'save = Dexie.override(save, orig => function () {...})', () => {
        save = Dexie.override(save, (orig: typeof original) =>
          function (this: unknown, note: string) {
            log.add(`about to save "${note}"`, 'warn');
            const result = orig.call(this, note);
            log.add('original finished', 'warn');
            return result;
          },
        );
        log.add('(save is now wrapped)', 'muted');
      }),
      d.step('Call save() again', 'Wrapper first, then the original.', 'save("call Per")', () => log.add(`-> ${save('call Per')}`, 'ok')),
    ],
    () => {
      save = original;
    },
  );
  return d.stage.dispose;
};

export default mount;
