// ChildEvent: who hears an add or remove, and in what order
import { ChildEvent, Group, Leafer, LeaferEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each step adds, removes or destroys a rect. Events fire only once the leafer is ready.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 6 : 10);
  const group = new Group();
  leafer.add(group);
  let n = 0;

  const make = (): Rect => {
    const rect = new Rect({ x: 20 + (n++ % 5) * 40, y: stage.height - 70, width: 30, height: 30, fill: GREEN, cornerRadius: 6 });
    for (const type of [ChildEvent.ADD, ChildEvent.REMOVE, ChildEvent.MOUNTED, ChildEvent.UNMOUNTED, ChildEvent.DESTROY]) {
      rect.on(type, () => log(`  rect   ${type}`));
    }
    return rect;
  };

  let rect: Rect | undefined;
  const steps = [
    (): void => {
      log('group.add(rect)');
      rect = make();
      group.add(rect);
    },
    (): void => {
      log('rect.remove()');
      rect?.remove();
    },
    (): void => {
      log('rect.destroy()');
      rect?.destroy();
    },
  ];
  leafer.on(LeaferEvent.READY, () => {
    group.on(ChildEvent.ADD, (e: ChildEvent) => log(`  group  ${ChildEvent.ADD} (child in ${e.parent === group ? 'group' : '?'})`));
    group.on(ChildEvent.REMOVE, () => log(`  group  ${ChildEvent.REMOVE}`));
    leafer.on(ChildEvent.ADD, () => log(`  leafer ${ChildEvent.ADD}`));
    leafer.on(ChildEvent.REMOVE, () => log(`  leafer ${ChildEvent.REMOVE}`));
    if (stage.bar) {
      button(stage.bar, 'add', steps[0]!);
      button(stage.bar, 'remove', steps[1]!);
      button(stage.bar, 'destroy', steps[2]!);
    } else {
      let i = 0;
      stage.every(1500, () => steps[i++ % 3]!());
    }
  });
  return stage.dispose;
};

export default mount;
