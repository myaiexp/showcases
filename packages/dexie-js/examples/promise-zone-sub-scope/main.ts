// A zone inside a zone inherits the outer values and leaves them untouched
import type { Mount } from '@/types.ts';
import { caption, eventLog } from '../../shared/panels.ts';
import { createStage } from '../../shared/stage.ts';
import { tour } from '../../shared/tour.ts';
import { newZone, zone } from '../../shared/zone-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Run it to see which zone sees which value.' });
  const say = caption(stage.root);
  const log = eventLog(stage.root, 'what each zone sees');
  say.set('Zones nest like boxes.');
  const show = (where: string): void => {
    const z = zone();
    log.add(`${where}: city=${z.city ?? '-'}, hobby=${z.hobby ?? '-'}`, z.city ? 'ok' : 'muted');
  };
  tour(stage, [
    {
      label: 'Nest two zones',
      hold: 3600,
      run: () => {
        log.clear();
        say.set('The inner zone adds a value.', 'Dexie.Promise.newPSD(fn)');
        show('top level');
        newZone(() => {
          zone().city = 'Oslo';
          show('outer zone');
          newZone(() => {
            zone().hobby = 'skiing';
            show('inner zone');
          });
          show('outer again');
        });
        show('top level');
      },
    },
  ]);
  return stage.dispose;
};

export default mount;
