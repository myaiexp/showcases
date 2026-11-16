// App & engine config: the pointer's hit radius
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycle, hoverLoop, label, sizer } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move just outside the rect\'s edge and raise hitRadius until it lights up.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { hitRadius: 5 }, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(80), y: u(70), width: u(100), height: u(60), fill: '#32cd79' });
  leafer.add(rect);
  rect.on(PointerEvent.ENTER, () => (rect.fill = '#8cf0b4'));
  rect.on(PointerEvent.LEAVE, () => (rect.fill = '#32cd79'));

    const say = label(stage, '', true);
    const setRadius = (v: number): void => {
      leafer.config.pointer!.hitRadius = v; // takes effect while running
      say(`hitRadius ${v}`);
    };

  if (stage.preview) {
    cycle(stage, [0, 20], setRadius, 3600);
    hoverLoop(stage, leafer, { x: u(80) - 12, y: u(100) }, 1400);
  } else slider(stage.bar!, 'hitRadius', 0, 40, 1, 5, setRadius);

  return stage.dispose;
};

export default mount;
