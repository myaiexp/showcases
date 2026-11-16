// Background runner: the animation keeps rendering while the tab is hidden
import { Leafer, Rect, RenderEvent } from 'leafer-ui';
import '@leafer-in/animate'; // the animate plugin: the animation property
import '@leafer-in/bg-runner'; // background rendering
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch to another tab for a few seconds and come back: "while hidden" has grown.' });
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

  let renders = 1;
  let hidden = 0;
  leafer.on(RenderEvent.START, () => {
    renders++;
    if (document.hidden) hidden++;
  });
  stage.every(250, () => say(`renders ${renders}\nwhile the tab was hidden ${hidden}`));

  return stage.dispose;
};

export default mount;
