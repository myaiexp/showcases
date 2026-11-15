// Extra data fields: kept in the options, but only a custom item would draw them
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const WITH = `infographic list-row-horizontal-icon-arrow
theme dark
data
  lists
    - label Design
      owner Maya
      icon pen
    - label Build
      owner Jun
      icon hammer
    - label Ship
      owner Ana
      icon rocket`;

const WITHOUT = WITH.replace(/ +owner .*\n/g, '');

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('getOptions().data');

  stage.cycle(
    [
      { say: 'Items with an owner field', syntax: WITH },
      { say: 'The same items without it: the picture is the same', syntax: WITHOUT },
    ].map(({ say, syntax }) => ({
      say,
      run: () => {
        infographic.render(syntax);
        if (code) code.textContent = JSON.stringify(infographic.getOptions().data, null, 2);
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
