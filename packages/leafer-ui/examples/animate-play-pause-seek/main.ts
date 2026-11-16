// Animate: an instance with autoplay off, driven by play, pause, stop and seek
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { button, slider } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Play and pause the slide, stop it (jumps to the end) or drag the seek slider.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = stage.preview ? 56 : 80;
  const rect = new Rect({ x: 20, y: (stage.height - s) / 2 + 10, width: s, height: s, cornerRadius: 12, fill: GREEN });
  leafer.add(rect);

  const total = stage.width - s - 40;
  const anim = rect.animate({ x: 20 + total, fill: '#feb027' }, { duration: 3, autoplay: false, easing: 'linear' });
  const say = label(stage, '', true);
  stage.loop(() => say(`time ${(anim.time ?? 0).toFixed(2)} s   running ${!!anim.running}   completed ${anim.completed}`));

  if (stage.bar) {
    button(stage.bar, 'play()', () => anim.play());
    button(stage.bar, 'pause()', () => anim.pause());
    button(stage.bar, 'stop()', () => anim.stop());
    slider(stage.bar, 'seek', 0, 100, 1, 0, (v) => anim.seek({ type: 'percent', value: v / 100 }), (v) => `${v}%`);
  } else {
    script(stage, async () => {
      anim.seek(0);
      anim.play();
      await stage.wait(1200);
      anim.pause();
      await stage.wait(700);
      anim.play();
      await stage.wait(1200);
      anim.seek({ type: 'percent', value: 0.2 });
      anim.pause();
      await stage.wait(900);
      anim.stop();
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
