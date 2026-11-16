// Animate: the started, running, completed and destroyed flags
import { Leafer, Rect, Text } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { GOLD, GREEN } from '../../shared/event-kit.ts';
import { track } from '../../shared/animate-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Play, pause, stop or destroy and watch which flags turn true.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer, stage.height * 0.68);
  let animate: Animate | undefined;
  stage.onDispose(() => animate?.destroy());

  const FLAGS = ['started', 'running', 'completed', 'destroyed'] as const;
  const cell = (stage.width - 24) / FLAGS.length;
  const lamps = FLAGS.map((name, i) => {
    const lamp = new Rect({ x: 12 + i * cell, y: 24, width: cell - 8, height: 34, cornerRadius: 6, fill: '#ddd', hittable: false });
    const text = new Text({ x: 12 + i * cell, y: 35, width: cell - 8, text: name, textAlign: 'center', fontSize: stage.preview ? 10 : 13, fill: '#333', hittable: false });
    leafer.add([lamp, text]);
    return lamp;
  });
  stage.loop(() => {
    FLAGS.forEach((name, i) => (lamps[i]!.fill = animate?.[name] ? GOLD : '#ddd'));
  });

  const make = (): void => {
    animate?.destroy();
    t.rect.x = t.from;
    animate = new Animate(t.rect, { x: t.to, fill: GREEN }, { duration: 2.4 });
  };
  make();
  if (stage.bar) {
    button(stage.bar, 'play()', () => animate?.play());
    button(stage.bar, 'pause()', () => animate?.pause());
    button(stage.bar, 'stop()', () => animate?.stop());
    button(stage.bar, 'destroy()', () => animate?.destroy());
    button(stage.bar, 'new Animate', make);
  } else {
    script(stage, async () => {
      make();
      await stage.wait(900);
      animate?.pause();
      await stage.wait(700);
      animate?.play();
      await stage.wait(900);
      animate?.stop();
      await stage.wait(700);
      animate?.destroy();
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
