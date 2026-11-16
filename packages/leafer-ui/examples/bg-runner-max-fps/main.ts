// Background runner: BackgroundRunner.maxFPS caps the rate in a hidden tab
import { Leafer, Rect, RenderEvent } from 'leafer-ui';
import '@leafer-in/animate';
import { BackgroundRunner } from '@leafer-in/bg-runner';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Pick a maxFPS, switch to another tab for about 5 seconds, and come back to read the frame rate of that stretch.',
  });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '');

  const w = stage.width;
  const rect = new Rect({
    x: 20,
    y: stage.height * 0.3,
    width: 50,
    height: 50,
    fill: '#32cd79',
    animation: {
      style: { x: w - 90, cornerRadius: 25, fill: '#ffcd00' }, // style keyframe
      duration: 1,
      swing: true, // play back and forth
    },
  });
  leafer.add(rect);

  // The setting is page-wide: put it back on cleanup. Cards only show it.
  const before = BackgroundRunner.maxFPS;
  if (stage.bar) {
    stage.onDispose(() => (BackgroundRunner.maxFPS = before));
    BackgroundRunner.maxFPS = 10; // the docs' value
    select(stage.bar, 'maxFPS', ['60', '30', '10', '2'], (v) => (BackgroundRunner.maxFPS = Number(v)), '10');
  }

  let renders = 0;
  let hiddenRenders = 0;
  let hiddenAt = 0;
  let last = 'no hidden stretch yet';
  leafer.on(RenderEvent.START, () => {
    renders++;
    if (document.hidden) hiddenRenders++;
  });
  const onVisibility = (): void => {
    if (document.hidden) {
      hiddenAt = performance.now();
      hiddenRenders = 0;
    } else if (hiddenAt) {
      const seconds = (performance.now() - hiddenAt) / 1000;
      last = `last hidden stretch: ${hiddenRenders} renders in ${seconds.toFixed(1)} s = ${(hiddenRenders / seconds).toFixed(1)} per second`;
      hiddenAt = 0;
    }
  };
  document.addEventListener('visibilitychange', onVisibility);
  stage.onDispose(() => document.removeEventListener('visibilitychange', onVisibility));
  stage.every(250, () => say(`BackgroundRunner.maxFPS = ${stage.bar ? BackgroundRunner.maxFPS : 'set in the full view'}\nrenders ${renders}\n${last}`));

  return stage.dispose;
};

export default mount;
