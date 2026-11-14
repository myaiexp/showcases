// Dexie.semVer is text like 4.4.7; Dexie.version is a number
import Dexie from 'dexie';
import type { Mount } from '@/types.ts';
import { objectDemo } from '../../shared/class-kit.ts';

const mount: Mount = (el, ctx) => {
  const d = objectDemo(el, ctx, { log: true });
  const { log } = d;
  d.say.set('Which Dexie is this?', 'Dexie.semVer, Dexie.version');
  d.run(
    [
      d.step('semVer', 'The familiar text form.', 'Dexie.semVer', () => log.add(`Dexie.semVer = "${Dexie.semVer}"`, 'ok')),
      d.step('version', 'The same, as one number.', 'Dexie.version', () => log.add(`Dexie.version = ${Dexie.version}`, 'ok')),
      d.step('How it is made', 'Each part gets two decimal places.', 'Dexie.version < 3.02', () => {
        const [a = 0, b = 0, c = 0] = Dexie.semVer.split('.').map((n) => parseInt(n));
        log.add(`${a} + ${b}/100 + ${c}/10000`, 'info');
        log.add(`= ${a + b / 100 + c / 10000}`, 'info');
      }),
      d.step('Check a minimum', 'A number can be compared.', 'if (Dexie.version < 3.02) throw ...', () => {
        log.add(`Dexie.version < 3.02: ${Dexie.version < 3.02}`, 'ok');
        log.add(Dexie.version < 3.02 ? 'too old' : 'new enough', Dexie.version < 3.02 ? 'bad' : 'ok');
      }),
    ],
    () => undefined,
  );
  return d.stage.dispose;
};

export default mount;
