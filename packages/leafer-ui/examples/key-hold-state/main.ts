// Keyboard: asking whether a key is held, instead of tracking down and up yourself
import { Keyboard, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hold Space, ShiftLeft or ShiftRight: the lamps follow Keyboard.isHold() (the engine has to hear the keys, so click the page first).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);
  const names = ['Space', 'ShiftLeft', 'ShiftRight'];
  const lamps = names.map((_, i) => new Rect({ x: 24 + i * 78, y: stage.height * 0.3, width: 60, height: 60, cornerRadius: 30, fill: '#ddd', hittable: false }));
  leafer.add(lamps);

  stage.loop(() => {
    const held = [Keyboard.isHoldSpaceKey(), Keyboard.isHold('ShiftLeft'), Keyboard.isHold('ShiftRight')];
    lamps.forEach((l, i) => (l.fill = held[i] ? '#32cd79' : '#ddd'));
    say(`isHoldSpaceKey() ${held[0]}\nisHold('ShiftLeft') ${held[1]}\nisHold('ShiftRight') ${held[2]}`);
  });

  if (stage.preview) {
    const interaction = leafer.interaction!;
    const data = (code: string): never => ({ code, key: code, x: 0, y: 0, buttons: 0, time: Date.now(), origin: { preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() {} } }) as never;
    const hold = async (code: string, ms: number): Promise<void> => {
      interaction.config.keyEvent = true; // the stage turns it off for cards
      interaction.keyDown(data(code));
      interaction.config.keyEvent = false;
      await stage.wait(ms);
      interaction.config.keyEvent = true;
      interaction.keyUp(data(code));
      interaction.config.keyEvent = false;
    };
    stage.onDispose(() => interaction.keyUp?.(data('Space')));
    script(stage, async () => {
      await stage.wait(500);
      await hold('Space', 1100);
      await stage.wait(400);
      await hold('ShiftLeft', 1100);
      await stage.wait(400);
      await hold('ShiftRight', 1100);
    });
  }
  return stage.dispose;
};

export default mount;
