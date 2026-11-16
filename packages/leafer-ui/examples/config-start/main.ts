// App & engine config: creating an engine that does not start by itself
import { Leafer, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press start / stop: the ball keeps moving in data, but only draws while the engine runs.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      start: false, // do not start automatically
      fill: '#333',
    }),
  );
  const ball = new Ellipse({ y: stage.height / 2, width: u(40), height: u(40), around: 'center', fill: GREEN });
  leafer.add(ball); // elements can be added before start()
  const say = label(stage, '', true);
  stage.loop((_dt, t) => {
    ball.x = stage.width / 2 + Math.sin(t * 2) * stage.width * 0.35;
    say(`running: ${leafer.running}`);
  });
  const toggle = (): void => (leafer.running ? leafer.stop() : leafer.start());

  leafer.start(); // start: false means we start it ourselves
  if (stage.preview) stage.every(1600, toggle);
  else button(stage.bar!, 'start / stop', toggle);

  return stage.dispose;
};

export default mount;
