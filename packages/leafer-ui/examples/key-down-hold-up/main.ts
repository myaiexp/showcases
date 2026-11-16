// KeyEvent: the three keyboard events on a leafer
import { KeyEvent, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press and hold keys (Shift left and right have different codes). Every engine on the page hears the keyboard; here only this one is open.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const pad = new Rect({ x: stage.width * 0.35, y: stage.height - 74, width: stage.width * 0.3, height: 54, fill: GREEN, cornerRadius: 12 });
  leafer.add(pad);

  leafer.on(KeyEvent.DOWN, (e: KeyEvent) => ((pad.fill = '#ff4b4b'), log(`key.down  key "${e.key}"  code ${e.code}`)));
  leafer.on(KeyEvent.HOLD, (e: KeyEvent) => log(`key.hold  ${e.code}`));
  leafer.on(KeyEvent.UP, (e: KeyEvent) => ((pad.fill = GREEN), log(`key.up    ${e.code}`)));

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      for (const [code, key] of [['KeyA', 'a'], ['ShiftLeft', 'Shift'], ['Space', ' ']]) {
        ghost.key(code!, key);
        await stage.wait(1200);
      }
    });
  }
  return stage.dispose;
};

export default mount;
