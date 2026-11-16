// Background runner: BackgroundRunner.disabled
import { Leafer, Rect, RenderEvent } from 'leafer-ui';
import '@leafer-in/animate';
import { BackgroundRunner } from '@leafer-in/bg-runner';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick "disabled", switch tabs for a few seconds and come back: nothing rendered while hidden.' });
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

  // The setting is page-wide: put it back on cleanup.
  const before = BackgroundRunner.disabled;
  stage.onDispose(() => (BackgroundRunner.disabled = before));
  if (stage.bar) checkbox(stage.bar, 'BackgroundRunner.disabled', BackgroundRunner.disabled, (v) => (BackgroundRunner.disabled = v));

  let renders = 1;
  let hidden = 0;
  leafer.on(RenderEvent.START, () => {
    renders++;
    if (document.hidden) hidden++;
  });
  stage.every(250, () => say(`disabled ${stage.bar ? BackgroundRunner.disabled : 'is set in the full view'}\nrenders ${renders}\nwhile the tab was hidden ${hidden}`));

  return stage.dispose;
};

export default mount;
