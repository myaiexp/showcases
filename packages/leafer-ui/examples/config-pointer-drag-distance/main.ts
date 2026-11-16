// App & engine config: the minimum movement that starts a drag
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a few pixels with dragDistance low, then high.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { dragDistance: 2 }, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(90), y: u(70), width: u(90), height: u(70), fill: GREEN, draggable: true });
  leafer.add(rect);
  const say = label(stage, '', true);
  const setDistance = (v: number): void => {
    leafer.config.pointer!.dragDistance = v;
    rect.set({ x: u(90), y: u(70) });
    say(`dragDistance ${v} px`);
  };

  if (stage.preview) {
    cycle(stage, [2, 30], setDistance, 3400);
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.drag({ x: u(135), y: u(105) }, { x: u(135) + 14, y: u(105) + 8 }, 500); // a short drag
      await stage.wait(900);
      rect.set({ x: u(90), y: u(70) });
      await stage.wait(300);
    });
  } else slider(stage.bar!, 'dragDistance (px)', 0, 60, 1, 2, setDistance);

  return stage.dispose;
};

export default mount;
