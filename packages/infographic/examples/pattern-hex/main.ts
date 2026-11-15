// The 'hex' pattern as a fill, in four looks
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const DATA = {
  title: 'Pattern hex',
  values: [
    { label: 'Q1', value: 12 },
    { label: 'Q2', value: 30 },
    { label: 'Q3', value: 22 },
    { label: 'Q4', value: 38 },
  ],
};

const LOOKS: { say: string; stylize: object }[] = [
  { say: "pattern: 'hex'", stylize: { type: 'pattern', pattern: 'hex' } },
  { say: 'scale: 2', stylize: { type: 'pattern', pattern: 'hex', scale: 2 } },
  { say: 'foregroundColor and backgroundColor', stylize: { type: 'pattern', pattern: 'hex', foregroundColor: '#F6BD16', backgroundColor: '#1d2a44' } },
  { say: 'another colour pair', stylize: { type: 'pattern', pattern: 'hex', foregroundColor: '#14213d', backgroundColor: '#61DDAA' } },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const side = stage.side('themeConfig.stylize');
  const infographic = stage.own(
    new Infographic({ container: stage.box, width: '100%', height: '100%', padding: ctx.preview ? 8 : 24, template: 'chart-column-simple', theme: 'dark', data: DATA }),
  );
  infographic.render();

  stage.cycle(
    LOOKS.map(({ say, stylize }) => ({
      say,
      run: () => {
        infographic.update({ themeConfig: { stylize: stylize as never } });
        if (side) side.textContent = JSON.stringify(stylize, null, 2);
      },
    })),
  );
  return () => stage.dispose();
};

export default mount;
