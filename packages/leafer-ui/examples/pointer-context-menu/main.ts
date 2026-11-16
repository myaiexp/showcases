// PointerEvent: the context menu events of a right click
import { Leafer, PointerButton, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Right-click the rect (and left-click it, for comparison).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.4, stage.height * 0.45);
  const rect = new Rect({ x: (stage.width - s) / 2, y: stage.height - s - 14, width: s, height: s, fill: GREEN, cornerRadius: 12 });
  leafer.add(rect);

  rect.on(PointerEvent.MENU, (e: PointerEvent) => {
    rect.fill = '#ff4b4b';
    log(`${PointerEvent.MENU}  right ${e.right}`);
  });
  rect.on(PointerEvent.MENU_TAP, () => {
    rect.fill = GREEN;
    log(PointerEvent.MENU_TAP);
  });
  rect.on(PointerEvent.TAP, (e: PointerEvent) => log(`tap  left ${e.left}`));

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: stage.width / 2, y: rect.y! + s / 2 };
    // The browser's contextmenu event is what calls interaction.menu(); a card calls it by hand.
    const menu = (): void => {
      const origin = { preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() {} };
      (leafer.interaction as unknown as { menu(d: object): void }).menu({ ...ghost.at, buttons: PointerButton.RIGHT, pointerType: 'mouse', origin, time: Date.now() });
    };
    script(stage, async () => {
      await ghost.glide(c.x, c.y, 350);
      ghost.down({ buttons: PointerButton.RIGHT });
      menu();
      await stage.wait(250);
      ghost.up({ buttons: PointerButton.RIGHT });
      await stage.wait(1200);
      await ghost.tap(c.x, c.y);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
