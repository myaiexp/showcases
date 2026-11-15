// Grouped values: category on each value, read back from getOptions()
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SYNTAXES = [
  `infographic chart-column-simple
theme dark
data
  title Rainfall Data
  values
    - label January
      value 18.9
      category Chongqing
    - label January
      value 12.4
      category Beijing
    - label February
      value 15.6
      category Chongqing
    - label February
      value 10.2
      category Beijing`,
  `infographic chart-column-simple
theme dark
data
  title Rainfall Data
  values
    - label January
      value 18.9
    - label February
      value 15.6
    - label March
      value 31.2`,
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24 }),
  );
  const code = stage.side('data.values');

  stage.cycle(
    SYNTAXES.map((syntax, i) => ({
      say: i === 0 ? 'With category: parsed and kept, but not used by this chart' : 'Without category',
      run: () => {
        infographic.render(syntax);
        const values = (infographic.getOptions().data as { values?: unknown } | undefined)?.values;
        if (code) code.textContent = `${syntax}\n\n\u2193\n\n${JSON.stringify(values, null, 2)}`;
      },
    })),
  );

  return () => stage.dispose();
};

export default mount;
