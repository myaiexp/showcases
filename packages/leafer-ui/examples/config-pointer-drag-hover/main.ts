// App & engine config: hover events during a drag
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycle, dragToAndFro, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the yellow rect across the green one with dragHover on and off.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      pointer: { dragHover: true }, // the default
      fill: '#333',
    }),
  );
  const target = new Rect({ x: u(110), y: u(70), width: u(90), height: u(80), fill: '#32cd79' });
  const dragged = new Rect({ x: u(20), y: u(90), width: u(50), height: u(40), fill: '#FEB027', draggable: true });
  leafer.add(target);
  leafer.add(dragged);
  target.on(PointerEvent.ENTER, () => (target.fill = '#8cf0b4'));
  target.on(PointerEvent.LEAVE, () => (target.fill = '#32cd79'));
  const say = label(stage, '', true);
  const setDragHover = (on: boolean): void => {
    leafer.config.pointer!.dragHover = on;
    say(`pointer.dragHover: ${on}`);
  };

  if (stage.preview) {
    cycle(stage, [true, false], setDragHover, 4600);
    dragToAndFro(stage, leafer, { x: u(45), y: u(110) }, { x: u(230), y: u(110) });
  } else checkbox(stage.bar!, 'dragHover', true, setDragHover);

  return stage.dispose;
};

export default mount;
