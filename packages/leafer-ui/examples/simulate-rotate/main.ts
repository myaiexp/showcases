// Interaction: simulated rotate events turning a rect
import { Leafer, Rect, RotateEvent, type IRotateEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { GREEN, label } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The script sends 30 degree rotate gestures." });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'viewport' }));
  const S = size(stage) * 0.6;
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, fill: GREEN, cornerRadius: 10, around: 'center' });
  leafer.add(rect);
  const say = label(stage, '', true);
  rect.on(RotateEvent.ROTATE, (e: RotateEvent) => {
    rect.rotation = (rect.rotation ?? 0) + e.rotation;
  });
  stage.loop(() => say('rect.rotation ' + Math.round(rect.rotation ?? 0)));
  const interaction = leafer.interaction!;
  const run = async (): Promise<void> => {
    for (let i = 0; i < 6; i++) {
      interaction.rotate({ x: stage.width / 2, y: stage.height / 2, rotation: 30 } as IRotateEvent);
      await stage.wait(450);
    }
  };
  if (stage.bar) button(stage.bar, 'rotate 30 degrees', () => interaction.rotate({ x: stage.width / 2, y: stage.height / 2, rotation: 30 } as IRotateEvent));
  else {
    script(stage, async () => {
      await stage.wait(500);
      await run();
      await stage.wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
