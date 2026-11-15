// on() and off(): the same function removed, the count stops, then resumes
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAX = (n: number) => `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Render ${n}
      desc on 'rendered'
    - label Count
      desc ${n}`;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  let heard = 0;
  let renders = 0;
  const onRendered = () => {
    heard += 1;
  };
  const draw = () => {
    renders += 1;
    infographic.render(SYNTAX(renders));
    stage.say(`renders: ${renders}, heard by the listener: ${heard}`);
  };

  infographic.on('rendered', onRendered);
  stage.button('Render', draw);
  stage.button('on()', () => { infographic.on('rendered', onRendered); stage.say('on("rendered", fn)'); });
  stage.button('off()', () => { infographic.off('rendered', onRendered); stage.say('off("rendered", fn)'); });

  stage.cycle([
    { run: draw, hold: 1000 },
    { run: draw, hold: 1000 },
    { run: () => { infographic.off('rendered', onRendered); draw(); }, hold: 1000 },
    { run: draw, hold: 1000 },
    { run: () => { infographic.on('rendered', onRendered); draw(); }, hold: 1000 },
  ]);
  return () => stage.dispose();
};

export default mount;
