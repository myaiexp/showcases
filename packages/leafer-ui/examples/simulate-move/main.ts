// Interaction: simulated pan events on a viewport Leafer
import { Leafer, Rect, MoveEvent, type IMoveEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN, label } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The script pans the layer; wheel to pan it yourself." });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'viewport' }));
  const S = size(stage) * 0.7;
  const rect = new Rect({ x: Math.round(stage.width * 0.3), y: Math.round(stage.height * 0.2), width: S, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const say = label(stage, '', true);
  let last = '';
  rect.on(MoveEvent.MOVE, (e: MoveEvent) => (last = Math.round(e.moveX) + ', ' + Math.round(e.moveY)));
  stage.loop(() => say('layer x ' + Math.round(leafer.x ?? 0) + ', y ' + Math.round(leafer.y ?? 0) + '   last MoveEvent ' + last));
  const interaction = leafer.interaction!;
  const origin = { x: rect.x!, y: rect.y! };
  const run = async (): Promise<void> => {
    for (const dx of [-30, -30, -30, 30, 30, 30]) {
      interaction.move({ ...origin, moveX: dx, moveY: dx / 2 } as IMoveEvent);
      await stage.wait(400);
    }
  };
  if (stage.bar) button(stage.bar, 'pan left and back', () => void run().catch(() => undefined));
  else {
    script(stage, async () => {
      await stage.wait(500);
      await run();
      await stage.wait(900);
    });
  }

  return stage.dispose;
};

export default mount;
