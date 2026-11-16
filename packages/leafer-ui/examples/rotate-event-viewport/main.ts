// RotateEvent: turning a custom-type leafer from its rotate listener
import { LeafHelper, Leafer, Rect, RotateEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Mouse and wheel cannot rotate, so the buttons call interaction.rotate(). On a touch screen, twist two fingers.' });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'custom' }));
  const log = logger(stage, 4);
  const s = Math.min(stage.width * 0.35, stage.height * 0.35);
  leafer.add(new Rect({ x: (stage.width - s) / 2, y: stage.height - s - 24, width: s, height: s, fill: '#32cd79', cornerRadius: 12 }));
  const c = { x: stage.width / 2, y: stage.height - s / 2 - 24 };

  leafer.on(RotateEvent.START, () => log('rotate.start'));
  leafer.on(RotateEvent.ROTATE, (e: RotateEvent) => {
    LeafHelper.rotateOfWorld(leafer, { x: e.x, y: e.y }, e.rotation);
    log(`rotate  ${e.rotation.toFixed(1)}  total ${e.totalRotation.toFixed(1)}`);
  });
  leafer.on(RotateEvent.END, () => log('rotate.end'));

  const turn = async (deg: number): Promise<void> => {
    for (let i = 0; i < 6; i++) {
      leafer.interaction?.rotate({ ...c, rotation: deg / 6 });
      await stage.wait(60);
    }
  };
  if (stage.bar) {
    button(stage.bar, 'rotate +30', () => void turn(30));
    button(stage.bar, 'rotate -30', () => void turn(-30));
  } else {
    script(stage, async () => {
      await stage.wait(500);
      await turn(45);
      await stage.wait(900);
      await turn(-90);
      await stage.wait(900);
      await turn(45);
      await stage.wait(500);
    });
  }
  return stage.dispose;
};

export default mount;
