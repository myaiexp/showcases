// Dexie.debug read, set to each documented value, and always put back
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { log: true, hint: 'The effect shows in your browser developer tools. This page is put back afterwards.' });
  const { stage, log } = d;
  const original = Dexie.debug;
  const restore = (): void => {
    Dexie.debug = original;
  };
  stage.onDispose(restore);
  const set = (value: false | true | 'dexie', what: string): void => {
    Dexie.debug = value;
    log.add(`Dexie.debug = ${JSON.stringify(Dexie.debug)}  (${what})`, value ? 'warn' : 'ok');
  };
  d.say.set('One switch for the whole page.', 'Dexie.debug = true | false | "dexie"');
  d.run(
    [
      d.step('Read it', 'Localhost starts with true, a hosted page with false.', 'Dexie.debug', () => {
        log.add(`Dexie.debug is ${JSON.stringify(Dexie.debug)} on this page`, 'info');
      }),
      d.step('false: production', 'No extra diagnostics.', 'Dexie.debug = false', () => set(false, 'production')),
      d.step('true: app developer', 'Dexie internals hidden from stack traces.', 'Dexie.debug = true', () => set(true, 'for app developers')),
      d.step('"dexie": Dexie developer', 'Every internal frame included.', 'Dexie.debug = "dexie"', () => set('dexie', 'for Dexie developers')),
      d.step('Put it back', 'Other cards on this page expect the original.', 'Dexie.debug = original', () => {
        restore();
        log.add(`restored to ${JSON.stringify(Dexie.debug)}`, 'ok');
      }),
    ],
    restore,
  );
  return stage.dispose;
};

export default mount;
