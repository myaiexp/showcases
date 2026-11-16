// App & Engine: batching many transforms between lockLayout and unlockLayout
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rotate the batch with and without the lock and compare the times.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const list: Rect[] = [];
  for (let i = 0; i < 600; i++) {
    const rect = new Rect({ x: (i % 30) * u(8) + u(20), y: Math.floor(i / 30) * u(8) + u(20), width: u(5), height: u(5), fill: `hsl(${i % 360}, 70%, 55%)` });
    list.push(rect);
    leafer.add(rect);
  }
  const say = label(stage, '', true);
  const worldOrigin = { x: stage.width / 2, y: stage.height / 2 };

  function rotateAll(locked: boolean): void {
    const start = performance.now();
    if (locked) leafer.lockLayout(); // forces an update, then suspends layout
    list.forEach((target) => target.rotateOf(target.getInnerPoint(worldOrigin), 3));
    if (locked) leafer.unlockLayout(); // one layout for the whole batch
    leafer.updateLayout();
    say(`${locked ? 'locked  ' : 'unlocked'}: 600 rotateOf in ${(performance.now() - start).toFixed(1)} ms`);
  }

  if (stage.preview) {
    let locked = false;
    stage.every(500, () => rotateAll((locked = !locked)));
  } else {
    button(stage.bar!, 'rotate (locked)', () => rotateAll(true));
    button(stage.bar!, 'rotate (unlocked)', () => rotateAll(false));
  }

  return stage.dispose;
};

export default mount;
