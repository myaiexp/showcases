// Interaction: simulated clicks with each mouse button
import { Leafer, Rect, PointerEvent, PointerButton, type IPointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';
import { logLines } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The script presses the buttons; click the rect yourself too." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const rect = new Rect({ x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1), width: S * 1.4, height: S, fill: GREEN });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const side = (e: PointerEvent): string => (e.left ? 'left' : e.middle ? 'middle' : e.right ? 'right' : '?');
  rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
    log('down ' + side(e));
    if (e.left) rect.fill = '#2b8cff';
  });
  rect.on(PointerEvent.TAP, (e: PointerEvent) => {
    log('tap ' + side(e));
    if (e.left) rect.fill = GREEN;
  });
  const interaction = leafer.interaction!;
  const at = { x: rect.x! + S * 0.7, y: rect.y! + S / 2 };
  const run = async (): Promise<void> => {
    interaction.pointerDown({ ...at, buttons: PointerButton.MIDDLE } as IPointerEvent);
    interaction.pointerUp(at as IPointerEvent);
    await stage.wait(500);
    interaction.pointerDown({ ...at, buttons: PointerButton.RIGHT } as IPointerEvent);
    interaction.pointerUp(at as IPointerEvent);
    await stage.wait(500);
    interaction.pointerDown(at as IPointerEvent);
    await stage.wait(500); // held down: the rect is blue
    interaction.pointerUp(at as IPointerEvent);
  };
  if (stage.bar) {
    let busy = false;
    button(stage.bar, 'run the simulation', () => {
      if (busy) return;
      busy = true;
      run().then(() => (busy = false), () => (busy = false));
    });
  } else {
    script(stage, async () => {
      await stage.wait(600);
      await run();
      await stage.wait(1200);
    });
  }

  return stage.dispose;
};

export default mount;
