// App & engine config: limiting the frame rate
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a maxFPS: the ball steps visibly and leafer.FPS follows.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      maxFPS: 60, // the default follows the display
      fill: '#333',
    }),
  );
  const ball = new Rect({ y: stage.height / 2 - u(20), width: u(40), height: u(40), cornerRadius: u(20), fill: GREEN });
  leafer.add(ball);
  const say = label(stage, '', true);
  let shown = 0;
  stage.loop((_dt, t) => {
    ball.x = stage.width / 2 - u(20) + Math.sin(t * 3) * stage.width * 0.35;
    if (t - shown > 0.3) ((shown = t), say(`maxFPS ${leafer.config.maxFPS}   leafer.FPS ${Math.round(leafer.FPS)}`));
  });
  const setFps = (v: number): void => void (leafer.config.maxFPS = v); // takes effect while running

  if (stage.preview) cycle(stage, [60, 10], setFps, 2500);
  else select(stage.bar!, 'maxFPS', ['60', '30', '20', '15', '10'], (v) => setFps(Number(v)), '60');

  return stage.dispose;
};

export default mount;
