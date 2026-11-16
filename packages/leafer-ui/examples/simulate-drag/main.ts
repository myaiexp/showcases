// Interaction: pointerDown, pointerMove and pointerUp make a drag
import { Leafer, Rect, DragEvent, type IPointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';
import { logLines } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The simulated pointer drags the rect; drag it yourself too." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const home = { x: Math.round(stage.width * 0.1), y: Math.round(stage.height * 0.12) };
  const rect = new Rect({ ...home, width: S, height: S, fill: GREEN, draggable: true });
  leafer.add(rect);
  const log = logLines(stage, 4, true);
  let count = 0;
  rect.on(DragEvent.START, () => ((count = 0), log('drag.start')));
  rect.on(DragEvent.DRAG, () => void (++count === 1 && log('drag ...')));
  rect.on(DragEvent.END, () => log('drag.end after ' + count + ' moves'));
  const interaction = leafer.interaction!;
  const run = async (): Promise<void> => {
    rect.set(home);
    const from = { x: home.x + S / 2, y: home.y + S / 2 };
    let last = from;
    interaction.pointerDown(from as IPointerEvent);
    for (let i = 1; i <= 10; i++) {
      last = { x: from.x + (stage.width * 0.5 * i) / 10, y: from.y + 10 * i };
      interaction.pointerMove({ ...last, buttons: 1 } as IPointerEvent);
      await stage.wait(60);
    }
    interaction.pointerUp(last as IPointerEvent); // release at the last point so the rect gets drag.end
  };
  if (stage.bar) button(stage.bar, 'run the drag', () => void run().catch(() => undefined));
  else {
    script(stage, async () => {
      await stage.wait(600);
      await run();
      await stage.wait(1400);
    });
  }

  return stage.dispose;
};

export default mount;
