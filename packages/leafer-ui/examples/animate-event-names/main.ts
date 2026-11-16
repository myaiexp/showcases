// AnimateEvent: all seven event names, each lighting a chip
import { Leafer, Rect, Text } from 'leafer-ui';
import { Animate, AnimateEvent } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { GOLD } from '../../shared/event-kit.ts';
import { track } from '../../shared/animate-kit.ts';

const NAMES = [
  ['CREATED', AnimateEvent.CREATED],
  ['PLAY', AnimateEvent.PLAY],
  ['PAUSE', AnimateEvent.PAUSE],
  ['STOP', AnimateEvent.STOP],
  ['SEEK', AnimateEvent.SEEK],
  ['UPDATE', AnimateEvent.UPDATE],
  ['COMPLETED', AnimateEvent.COMPLETED],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Play, pause, seek and stop: each button fires its event; update fires every frame while it runs.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const t = track(stage, leafer, stage.height * 0.75);

  const cols = stage.preview ? 2 : 4;
  const w = (stage.width - 24) / cols;
  const h = stage.preview ? 26 : 38;
  const chips = NAMES.map(([name, value], i) => {
    const x = 12 + (i % cols) * w;
    const y = 12 + Math.floor(i / cols) * (h + 6);
    const chip = new Rect({ x, y, width: w - 6, height: h, cornerRadius: 6, fill: '#ddd', hittable: false });
    const text = new Text({ x, y: y + h / 2 - 6, width: w - 6, textAlign: 'center', text: `${name}  '${value}'`, fontSize: stage.preview ? 9 : 12, fill: '#333', hittable: false });
    leafer.add([chip, text]);
    return chip;
  });
  const light = (i: number): void => {
    chips[i]!.fill = GOLD;
    stage.after(i === 5 ? 120 : 450, () => (chips[i]!.fill = '#ddd'));
  };

  let animate: Animate | undefined;
  stage.onDispose(() => animate?.destroy());
  const make = (): Animate => {
    animate?.destroy();
    t.rect.x = t.from;
    const made = new Animate(t.rect, { x: t.to }, { duration: 2.2, autoplay: false });
    NAMES.forEach(([, type], i) => made.on(type, () => light(i)));
    light(0); // created fired inside the constructor, before on()
    return (animate = made);
  };
  make();

  if (stage.bar) {
    button(stage.bar, 'play()', () => animate?.play());
    button(stage.bar, 'pause()', () => animate?.pause());
    button(stage.bar, 'seek(50%)', () => animate?.seek({ type: 'percent', value: 0.5 }));
    button(stage.bar, 'stop()', () => animate?.stop());
    button(stage.bar, 'new Animate', make);
  } else {
    script(stage, async () => {
      make();
      await stage.wait(600);
      animate?.play();
      await stage.wait(700);
      animate?.pause();
      await stage.wait(700);
      animate?.seek({ type: 'percent', value: 0.6 });
      await stage.wait(700);
      animate?.play();
      await stage.wait(700);
      animate?.stop();
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
