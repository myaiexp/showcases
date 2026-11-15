// getOptions() after render(): what each syntax line was parsed into
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAXES = [
  `infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Step 1
      desc Start
    - label Step 2
      desc Done`,
  `infographic list-row-simple-horizontal-arrow
theme dark
  palette #61DDAA #F6BD16
  base.text.fill #ffffff
data
  lists
    - label Step 1
      desc Start
    - label Step 2
      desc Done`,
  `design
  structure list-row
    gap 12
  item simple
theme dark
data
  title Parsed
  lists
    - label Step 1
      value 3.5
    - label Step 2
      value 7`,
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('getOptions()');

  stage.cycle(
    SYNTAXES.map((syntax, i) => ({
      say: `syntax ${i + 1} of ${SYNTAXES.length}`,
      run: () => {
        infographic.render(syntax);
        const { template, design, data, theme, themeConfig } = infographic.getOptions();
        if (code) {
          code.textContent = `${syntax}\n\n\u2193\n\n${JSON.stringify({ template, design, data, theme, themeConfig }, null, 2)}`;
        }
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
