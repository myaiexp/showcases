// MoveEvent: panning a custom-type leafer from its own move listener
import { Leafer, MoveEvent, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Turn the wheel (Shift for sideways) over the canvas, or press the buttons. Each move pans the leafer.' });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'custom' }));
  const log = logger(stage, 4);
  for (let i = 0; i < 4; i++) leafer.add(new Rect({ x: 20 + i * 70, y: stage.height * 0.5 + (i % 2) * 20, width: 50, height: 50, cornerRadius: 10, fill: ['#32cd79', '#4B8BFF', '#feb027', '#ff4b4b'][i] }));

  leafer.on(MoveEvent.START, () => log('move.start'));
  leafer.on(MoveEvent.MOVE, (e: MoveEvent) => {
    leafer.moveWorld(e.moveX, e.moveY);
    log(`move  ${e.moveType}  d(${Math.round(e.moveX)}, ${Math.round(e.moveY)})  total(${Math.round(e.totalX)}, ${Math.round(e.totalY)})`);
  });
  leafer.on(MoveEvent.END, () => log('move.end'));

  const pan = async (dx: number, dy: number): Promise<void> => {
    const p = { x: stage.width / 2, y: stage.height / 2 };
    for (let i = 0; i < 5; i++) {
      leafer.interaction?.move({ ...p, moveX: dx / 5, moveY: dy / 5 });
      await stage.wait(60);
    }
  };
  if (stage.bar) {
    button(stage.bar, '← pan', () => void pan(-80, 0));
    button(stage.bar, '→ pan', () => void pan(80, 0));
    button(stage.bar, '↑ pan', () => void pan(0, -60));
  } else {
    script(stage, async () => {
      await stage.wait(500);
      await pan(-60, 0);
      await stage.wait(900);
      await pan(60, 30);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
