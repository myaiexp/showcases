// App & engine config: enabling or disabling keyboard events
import { Leafer, KeyEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type on the page (click it first); toggle keyEvent and type again.', paper: 'transparent' });
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      keyEvent: true, // the default
      fill: '#333',
    }),
  );
  const say = label(stage, 'press a key');
  const log: string[] = [];
  leafer.on(KeyEvent.DOWN, (e: KeyEvent) => {
    log.unshift(`${e.code} down`);
    log.length = Math.min(log.length, stage.preview ? 6 : 10);
    say(log.join('\n'));
  });
  const say2 = label(stage, '', true);
  stage.loop(() => say2(`keyEvent: ${leafer.config.keyEvent}`));

  if (stage.preview) {
    // A card never reads the reader's keys; its ghost sends a few through the engine.
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      for (const code of ['KeyA', 'KeyS', 'KeyD']) {
        ghost.key(code);
        await stage.wait(700);
      }
      await stage.wait(900);
    });
  } else checkbox(stage.bar!, 'keyEvent', true, (on) => (leafer.config.keyEvent = on));

  return stage.dispose;
};

export default mount;
